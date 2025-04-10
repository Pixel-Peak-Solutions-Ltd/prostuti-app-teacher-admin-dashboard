import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Grid from '@mui/material/Grid2';
import SearchField from "../../../../shared/components/SearchField";
import PublishedFlashCards from "./PublishedFlashCards";
import { useGetAllPublishedFlashcardsQuery, useGetAllUnPublishedFlashcardsQuery } from "../../../../redux/features/flashcard/flashcardApi";
import Loader from "../../../../shared/components/Loader";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FlashCard = () => {
    const [approved, setApproved] = useState<boolean>(true);
    const [searchObj, setSearchObj] = useState<Record<string, string>>({});
    const searchTerm = searchObj?.searchTerm || "";
    const [value, setValue] = useState(0);
    const { data: publishedFlashCards, isLoading: unpublishedLoader } = useGetAllPublishedFlashcardsQuery({ searchTerm, skip: value === 1 });
    const { data: unPublishedFlashCards, isLoading: publishedLoader } = useGetAllUnPublishedFlashcardsQuery({ searchTerm, skip: value === 0 });

    // tab changer handler
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setApproved(!approved);
    };

    // search field handler
    const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchObj(prev => ({ ...prev, [name]: value }));
    };

    if (unpublishedLoader || publishedLoader) {
        return <Loader />;
    }
    const unPublished = unPublishedFlashCards?.data.data || [];
    const published = publishedFlashCards?.data.data || [];

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px', p: 3 }}>
                    <Box sx={{ width: "auto" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box >
                                <h2 style={{ fontSize: "30px", lineHeight: "38px" }}>Flashcard</h2>
                            </Box>
                        </Box>
                        {/* tab switcher */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {/* <Box> */}
                                <Tab label={`Published (${published.length})`} {...a11yProps(0)} />
                                {/* </Box> */}
                                <Tab label={`Pending (${unPublished.length})`} {...a11yProps(1)} />

                            </Tabs>
                        </Box>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid size={12} sx={{ mx: 3 }}>
                                <SearchField
                                    value={searchObj.searchTerm}
                                    name="searchTerm"
                                    placeholder="Search for flashcard"
                                    handleInput={handleSearchTerm}
                                />
                            </Grid>
                        </Grid>

                        {/*1st tab content */}
                        <CustomTabPanel value={value} index={0}>
                            <PublishedFlashCards cards={published} />
                        </CustomTabPanel>
                        {/*2nd tab content */}
                        <CustomTabPanel value={value} index={1}>
                            <PublishedFlashCards cards={unPublished} />
                        </CustomTabPanel>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default FlashCard;