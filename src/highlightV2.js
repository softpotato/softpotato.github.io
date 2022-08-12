import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

/**
 * This code was copied from the template
 * example library.
 * https://github.com/mui/material-ui/blob/v5.10.0/docs/data/material/getting-started/templates/blog/Blog.js
 * 
 * I really didn't want to struggle with this,
 * but I'll integrate it another time when
 * I really have something I want to show off.
 * 
 * @param {*} props 
 * @returns 
 */
function HighlightV2(props) {
    return <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {post.date}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {post.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Continue reading...
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={post.image}
                    alt={post.imageLabel}
                />
            </Card>
        </CardActionArea>
    </Grid>
}

export default HighlightV2;