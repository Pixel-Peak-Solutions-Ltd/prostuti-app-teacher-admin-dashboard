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
  FormControlLabel,
  Switch,
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
  activeForAllCourses: boolean;
  course_id?: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

// Zod schema for form validation
const couponSchema = z
  .object({
    title: z.string().min(3, "Coupon title must be at least 3 characters"),
    discountType: z.enum(["Percentage", "Amount"]),
    discountValue: z.number().positive("Discount value must be positive"),
    activeForAllCourses: z.boolean(),
    course_id: z.string().optional(),
    startDate: z.any().refine((val) => dayjs(val).isValid(), {
      message: "Invalid start date",
    }),
    endDate: z.any().refine((val) => dayjs(val).isValid(), {
      message: "Invalid end date",
    }),
  })
  .refine((data) => dayjs(data.endDate).isAfter(dayjs(data.startDate)), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) =>
      data.activeForAllCourses || (!data.activeForAllCourses && data.course_id),
    {
      message: "Course ID is required when not active for all courses",
      path: ["course_id"],
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
      activeForAllCourses: true,
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
    },
  });

  const activeForAllCourses = watch("activeForAllCourses");

  const onSubmit = async (data: CouponFormData) => {
    try {
      const {activeForAllCourses,...payload}=data
      const apiPayload: ICreateCouponPayload = {
        ...payload,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };

      // Remove unnecessary fields before sending to API
      if (activeForAllCourses) {
        delete apiPayload.course_id;
      }

      await createCoupon(apiPayload).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create coupon:", error);
    }
  };

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

            {!activeForAllCourses && (
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
            <Box sx={{ gridColumn: "span 3" }}>
  <Controller
    name="activeForAllCourses"
    control={control}
    render={({ field: { onChange, value } }) => (
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label="Active for all courses"
        sx={{ marginTop: 2 }}
      />
    )}
  />
</Box>
           
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
