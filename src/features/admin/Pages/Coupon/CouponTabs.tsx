import { Grid2, Tab, Tabs } from "@mui/material";
import SearchBar from "./SearchBar";
import CouponTable from "./CoupoonTable";
import { useState } from "react";

const CouponTabs = () => {
  const [activeTab,setActiveTab]=useState<"course"|"user">('course');
  const [searchTerm,setSearchTerm]=useState<string|"">('');
  const handleTabChange=()=>{
    if(activeTab==='course'){
      setActiveTab('user');
    }else{
      setActiveTab('course');
    }
  }
  return (
    <Grid2 size={12}>
      <Grid2 size={4}>
        <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab value="course" label="Course" />
          <Tab value="user" label="User" />
        </Tabs>
      </Grid2>
      <Grid2 size={12}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </Grid2>
      <Grid2 size={12}>
        <CouponTable activeTab={activeTab} searchTerm={searchTerm}/>
      </Grid2>
    </Grid2>
  );
};

export default CouponTabs;
