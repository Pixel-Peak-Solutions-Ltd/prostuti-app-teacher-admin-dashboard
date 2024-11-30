import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Paper } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar, EventPropGetter, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const localizer = dayjsLocalizer(dayjs);

type RoutineEvent = {
  name: string;
  start: Date;
  end: Date;
  title: "Class" | "Assignment" | "Exam";
};
const events: RoutineEvent[] = [
  {
    title: "Class",
    name: "Physics Class",
    start: new Date("2024-12-02T09:00:00.000Z"),
    end: new Date(2024, 11, 2, 10, 0),
  },
  {
    title: "Assignment",
    name: "Math Assignment Due",
    start: new Date(2024, 11, 2, 11, 0),
    end: new Date(2024, 11, 2, 12, 0),
  },
  {
    title: "Class",
    name: "Chemistry Class",
    start: new Date(2024, 11, 3, 10, 0),
    end: new Date(2024, 11, 3, 11, 30),
  },
  {
    title: "Exam",
    name: "History Exam",
    start: new Date(2024, 11, 4, 9, 0),
    end: new Date(2024, 11, 4, 12, 0),
  },
  {
    title: "Class",
    name: "Biology Lab",
    start: new Date(2024, 11, 4, 14, 0),
    end: new Date(2024, 11, 4, 16, 0),
  },
  {
    title: "Class",
    name: "Computer Science Lecture",
    start: new Date(2024, 11, 5, 8, 30),
    end: new Date(2024, 11, 5, 10, 0),
  },
  {
    title: "Assignment",
    name: "English Literature Assignment",
    start: new Date(2024, 11, 5, 11, 0),
    end: new Date(2024, 11, 5, 12, 30),
  },
  {
    title: "Class",
    name: "Physics Lab",
    start: new Date(2024, 11, 6, 13, 0),
    end: new Date(2024, 11, 6, 15, 0),
  },
  {
    title: "Exam",
    name: "Math Exam",
    start: new Date(2024, 11, 6, 16, 0),
    end: new Date(2024, 11, 6, 18, 0),
  },
  {
    title: "Class",
    name: "Group Study Session (Chemistry)",
    start: new Date(2024, 11, 7, 10, 0),
    end: new Date(2024, 11, 7, 12, 0),
  },
];

const Routine = () => {
  const [selectedDayEvents, setSelectedDayEvents] = useState<RoutineEvent[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  useEffect(() => {
    const today = new Date();
    handleDayClick(today);  
  }, []);

  const handleDayClick = (date: Date) => {
    const selectedDay = dayjs(date).startOf("day");
    const filteredEvents = events.filter((event) =>
      dayjs(event.start).isSame(selectedDay, "day")
    );
    setSelectedDayEvents(filteredEvents);
    setSelectedDate(date);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {/* top name and button section */}

      <Box
        component="section"
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Link to="">
          <Button
            variant="outlined"
            sx={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              borderColor: "grey.700",
              color: "#3F3F46",
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </Button>
        </Link>
        <Typography variant="h3">Routine</Typography>
      </Box>
      {/* dynamic form component*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
        }}
      ></Box>

      <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <CalendarComponent onDayClick={handleDayClick} />
          </Grid2>
          <Grid2 size={4}>
            <Sidebar
              selectedDayEvents={selectedDayEvents}
              selectedDate={selectedDate}
            />
          </Grid2>
        </Grid2>
      </Box>

      {/* nested children */}
    </Box>
  );
};

export default Routine;

const CalendarComponent = ({
  onDayClick,
}: {
  onDayClick: (date: Date) => void;
}) => {
  const eventPropGetter: EventPropGetter<RoutineEvent> = (
    event: RoutineEvent
  ) => {
    let backgroundColor =
      event.title === "Class"
        ? "#d4f7dc"
        : event.title === "Assignment"
          ? "#fff4d4"
          : "#f7d4d4";
    let color =
      event.title === "Class"
        ? "#14802d"
        : event.title === "Assignment"
          ? "#8a690a"
          : "#800808";

    return {
      style: {
        backgroundColor,
        color,
        borderRadius: "4px",
        padding: "4px 5px",
        fontSize: "14px",
        textAlign: "center",
      },
    };
  };

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", height: "auto", borderRadius: "10px", p: 3 }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        onSelectSlot={({ start }) => onDayClick(start)}
        selectable
        eventPropGetter={eventPropGetter}
      />
    </Paper>
  );
};

interface SidebarProps {
  selectedEvent: RoutineEvent | null;
}

const Sidebar = ({
  selectedDayEvents,
  selectedDate,
}: {
  selectedDayEvents: RoutineEvent[];
  selectedDate: Date | null;
}) => {
  const getUpcomingEvents = (events: RoutineEvent[]) => {
    const today = dayjs().startOf("day");
    const twoDaysLater = today.add(3, "day");

    return events.filter((event) => {
      const eventStart = dayjs(event.start);
      return (
        eventStart.isSameOrAfter(today) && eventStart.isBefore(twoDaysLater)
      );
    });
  };

  const formattedDate = selectedDate
    ? dayjs(selectedDate).format("dddd, MMMM D, YYYY")
    : "Day Events";

  const upcomingEvents = getUpcomingEvents(events);
  return (
    <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Event Details Section */}
        <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {formattedDate}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box>
            {selectedDayEvents.length > 0
              ? selectedDayEvents.map((event: RoutineEvent, index: any) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor:
                        event.title === "Class"
                          ? "#d4f7dc"
                          : event.title === "Assignment"
                            ? "#fff4d4"
                            : "#f7d4d4",
                      color:
                        event.title === "Class"
                          ? "#14802d"
                          : event.title === "Assignment"
                            ? "#8a690a"
                            : "#800808",
                      borderRadius: "4px",
                      padding: "8px 5px",
                      fontSize: "16px",
                      textAlign: "center",
                      marginBottom: 1,
                    }}
                  >
                    {event.title}
                  </Box>
                ))
              : null}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Activity
            </Typography>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((event: RoutineEvent, index: any) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />{" "}
                      {/* Set the dot color to blue */}
                      {index < selectedDayEvents.length - 1 && (
                        <TimelineConnector
                          sx={{ backgroundColor: "primary.main" }}
                        />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1">{event.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(event.start).format("MMMM D, YYYY h:mm A")}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <Typography variant="body2">No events for this day.</Typography>
              )}
            </Timeline>
          </Box>
        </Paper>

        {/* Upcoming Events Section */}
        <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upcoming Events
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Paper sx={{ padding: 2, borderRadius: 2, mb: 2 }}>
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            backgroundColor:
                              event.title === "Class"
                                ? "#d4f7dc"
                                : event.title === "Assignment"
                                  ? "#fff4d4"
                                  : "#f7d4d4",
                            color:
                              event.title === "Class"
                                ? "#14802d"
                                : event.title === "Assignment"
                                  ? "#8a690a"
                                  : "#800808",
                            borderRadius: "4px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            textAlign: "center",
                            marginBottom: 1,
                            width: "fit-content",
                          }}
                        >
                          {event.title}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {event.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {dayjs(event.start).format("MMMM D, YYYY h:mm A")}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </Paper>
              ))
            ) : (
              <Typography variant="body2">No upcoming events.</Typography>
            )}
          </List>
        </Paper>
      </Box>
    </Paper>
  );
};
