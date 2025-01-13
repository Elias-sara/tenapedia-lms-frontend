import React from 'react';
import {
  Box,
  Typography,
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';

// Helper component to handle proper DOM nesting
const SafeListItemText = ({ primary, secondary }) => (
  <ListItemText
    primary={
      <Box component="div">
        <Typography variant="subtitle1">
          {primary}
        </Typography>
      </Box>
    }
    secondary={
      <Box component="div">
        <Typography variant="body2" color="text.secondary">
          {secondary}
        </Typography>
      </Box>
    }
  />
);

export const ResourceList = ({ resources }) => (
  <List>
    {resources.map((resource, index) => (
      <ListItem 
        key={index} 
        component="a" 
        href={resource} 
        target="_blank"
        sx={{ 
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'action.hover'
          }
        }}
      >
        <ListItemIcon>
          <MenuBook />
        </ListItemIcon>
        <SafeListItemText
          primary={`Resource ${index + 1}`}
          secondary={resource}
        />
      </ListItem>
    ))}
  </List>
);

// Helper function to process image URLs
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '/images/default-placeholder.jpg';
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/')) return imageUrl;
  return `/images/${imageUrl}`;
};

export const LessonImage = ({ src, alt, ...props }) => (
  <img 
    src={getImageUrl(src)}
    alt={alt}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/images/default-placeholder.jpg';
    }}
    {...props}
  />
);
