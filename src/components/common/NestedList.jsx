import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Collapse,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  PlayCircleOutline,
  PlayCircle,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

export const SafeListItemText = ({ primary, secondary, ...props }) => (
  <ListItemText
    primary={primary}
    primaryTypographyProps={{
      component: 'div',
      sx: { display: 'flex', alignItems: 'center' }
    }}
    secondary={secondary}
    secondaryTypographyProps={{
      component: 'div'
    }}
    {...props}
  />
);

export const ModuleListItem = ({ 
  module, 
  moduleIndex, 
  currentModuleId,
  currentLessonId,
  progress = {},
  ...props 
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(module._id === currentModuleId);

  const handleModuleClick = () => {
    setOpen(!open);
  };

  const handleLessonClick = (lessonId) => {
    router.push(`/students/courses/${module.courseId}/learn?lesson=${lessonId}`);
  };

  return (
    <>
      <ListItem 
        component="button"
        onClick={handleModuleClick}
        selected={module._id === currentModuleId}
        {...props}
      >
        <SafeListItemText
          primary={`Module ${moduleIndex + 1}: ${module.title}`}
          secondary={
            <>
              <Typography component="div" variant="body2" color="text.secondary">
                {module.description}
              </Typography>
              {module.quizzes?.length > 0 && (
                <Typography 
                  component="div" 
                  variant="caption" 
                  color="primary"
                  sx={{ mt: 0.5 }}
                >
                  {module.quizzes.length} Quiz{module.quizzes.length > 1 ? 'zes' : ''}
                </Typography>
              )}
            </>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {module.lessons?.map((lesson, lessonIndex) => (
            <ListItem
              key={lesson._id}
              component="button"
              onClick={() => handleLessonClick(lesson._id)}
              selected={lesson._id === currentLessonId}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                {progress[lesson._id] === 'completed' ? (
                  <CheckCircle color="success" />
                ) : progress[lesson._id] === 'in-progress' ? (
                  <PlayCircleOutline color="primary" />
                ) : (
                  <RadioButtonUnchecked />
                )}
              </ListItemIcon>
              <SafeListItemText
                primary={
                  <Typography component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {`${lessonIndex + 1}. ${lesson.title}`}
                    {lesson.type === 'video' && (
                      <PlayCircle fontSize="small" color="action" />
                    )}
                  </Typography>
                }
                secondary={
                  <>
                    {lesson.duration && (
                      <Typography component="div" variant="caption" color="text.secondary">
                        Duration: {lesson.duration} min
                        {lesson.order && (
                          <span style={{ marginLeft: '8px' }}>
                            • Lesson {lesson.order}
                          </span>
                        )}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const LessonListItem = ({ lesson, lessonIndex, ...props }) => (
  <ListItem {...props}>
    <SafeListItemText
      primary={`${lessonIndex + 1}. ${lesson.title}`}
      secondary={lesson.description}
    />
  </ListItem>
);
