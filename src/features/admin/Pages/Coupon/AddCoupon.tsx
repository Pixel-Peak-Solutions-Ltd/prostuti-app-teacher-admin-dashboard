import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCreateCouponMutation } from "../../../../redux/features/coupon/couponApi";
import { ICreateCouponPayload } from "../../../../types/coupon.types";

// Create an intermediary type for the form
interface CouponFormData {
  title: string;
  discountType: "Percentage" | "Amount";
  discountValue: number;
  voucherType: "All_Course" | "Specific_Course" | "Specific_Student";
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  course_id?: string;
  student_id?: string;
}

// Zod schema for form validation
const couponSchema = z
  .object({
    title: z.string().min(3, "Coupon title must be at least 3 characters"),
    discountType: z.enum(["Percentage", "Amount"]),
    discountValue: z.number().positive("Discount value must be positive"),
    voucherType: z.enum(["All_Course", "Specific_Course", "Specific_Student"]),
    startDate: z.any().refine((val) => dayjs(val).isValid(), {
      message: "Invalid start date",
    }),
    endDate: z.any().refine((val) => dayjs(val).isValid(), {
      message: "Invalid end date",
    }),
    course_id: z.string().optional(),
    student_id: z.string().optional(),
  })
  .refine((data) => dayjs(data.endDate).isAfter(dayjs(data.startDate)), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => !(data.voucherType === "Specific_Course" && !data.course_id),
    {
      message: "Course ID is required for Specific Course voucher",
      path: ["course_id"],
    }
  )
  .refine(
    (data) => !(data.voucherType === "Specific_Student" && !data.student_id),
    {
      message: "Student ID is required for Specific Student voucher",
      path: ["student_id"],
    }
  );

interface AddCouponModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCouponModal: React.FC<AddCouponModalProps> = ({ open, onClose }) => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      title: "",
      discountType: "Percentage",
      discountValue: 0,
      voucherType: "All_Course",
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
    },
  });

  const voucherType = watch("voucherType");

  const onSubmit = async (data: CouponFormData) => {
    const { voucherType, ...payload } = data;
  try {
    const apiPayload: ICreateCouponPayload = {
      ...payload,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString()
    };
    await createCoupon(apiPayload).unwrap();
    reset();
    onClose();
  } catch (error) {
    console.error('Failed to create coupon:', error);
  }
  }

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Add New Coupon
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={3}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Coupon Title"
                  placeholder="Enter coupon title..."
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  margin="normal"
                />
              )}
            />

            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.discountType}
            >
              <InputLabel>Discount Type</InputLabel>
              <Controller
                name="discountType"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Discount Type">
                    <MenuItem value="Percentage">Percentage</MenuItem>
                    <MenuItem value="Amount">Amount</MenuItem>
                  </Select>
                )}
              />
              {errors.discountType && (
                <FormHelperText>{errors.discountType.message}</FormHelperText>
              )}
            </FormControl>

            <Controller
              name="discountValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Discount Value"
                  type="number"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  error={!!errors.discountValue}
                  helperText={errors.discountValue?.message}
                  margin="normal"
                />
              )}
            />

            <FormControl fullWidth margin="normal" error={!!errors.voucherType}>
              <InputLabel>Voucher Type</InputLabel>
              <Controller
                name="voucherType"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Voucher Type">
                    <MenuItem value="All_Course">All Courses</MenuItem>
                    <MenuItem value="Specific_Course">Specific Course</MenuItem>
                    <MenuItem value="Specific_Student">
                      Specific Student
                    </MenuItem>
                  </Select>
                )}
              />
              {errors.voucherType && (
                <FormHelperText>{errors.voucherType.message}</FormHelperText>
              )}
            </FormControl>

            {voucherType === "Specific_Course" && (
              <Controller
                name="course_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Course ID"
                    error={!!errors.course_id}
                    helperText={errors.course_id?.message}
                    margin="normal"
                  />
                )}
              />
            )}

            {voucherType === "Specific_Student" && (
              <Controller
                name="student_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Student ID"
                    error={!!errors.student_id}
                    helperText={errors.student_id?.message}
                    margin="normal"
                  />
                )}
              />
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Start Date"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="End Date"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCouponModal;
