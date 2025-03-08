import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, ThreeDRotation, MoreVert } from "@mui/icons-material";
import { useGetAllCouponsQuery } from "../../../../redux/features/coupon/couponApi";
import Loader from "../../../../shared/components/Loader";
import dayjs from "dayjs";
import UpdateCouponModal from "./UpdateCoupon";
import { Edit as EditIcon } from "@mui/icons-material";

interface CouponTableProps {
  activeTab: "course" | "user";
  searchTerm?: string;
}

const CouponTable: React.FC<CouponTableProps> = ({ activeTab, searchTerm }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);

  const handleEditClick = (id: string) => {
    setSelectedCouponId(id);
    setUpdateModalOpen(true);
  };
  const {
    data: couponsData,
    isLoading,
    isError,
  } = useGetAllCouponsQuery({
    [activeTab === "course" ? "course" : "user"]: true,
    searchTerm,
  });

  if (isLoading) {
    return <Loader />;
  }
  const coupons = couponsData?.data.data;

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      {coupons?.length === 0 ? (
        <Box
          component="section"
          sx={{
            width: "100%",
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          NO Coupons found
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              {activeTab === "course" && (
                <>
                  <TableCell>Course</TableCell> <TableCell>Category</TableCell>
                </>
              )}
              {activeTab === "user" && <TableCell>Student</TableCell>}
              <TableCell>Code</TableCell>
              <TableCell>Active From</TableCell>
              <TableCell>Active To</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons?.map((coupon, index) => (
              <TableRow key={coupon._id}>
                <TableCell>{index + 1}</TableCell>
                {activeTab === "course" && (
                  <>
                    <TableCell>{coupon?.course_id?.name ?? "All"}</TableCell>{" "}
                    <TableCell>
                      {coupon?.course_id?.category_id?.type ?? "All"}
                    </TableCell>
                  </>
                )}
                {activeTab === "user" && (
                  <TableCell>{coupon?.student_id?.name}</TableCell>
                )}
                <TableCell>{coupon.title}</TableCell>
                <TableCell>
                  {dayjs(coupon.startDate).format("MMMM D, YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(coupon.endDate).format("MMMM D, YYYY")}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(coupon._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <UpdateCouponModal
                    open={updateModalOpen}
                    onClose={() => {
                      setUpdateModalOpen(false);
                      setSelectedCouponId(null);
                    }}
                    couponId={selectedCouponId}
                  />

                  {/* <IconButton color="secondary" onClick={() => handleDelete(coupon.id)}>
                    <Delete />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default CouponTable;
