import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function BodyBanner(props) {

    return <Grid container spacing={2}>
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant='h5'>
                        {props.bannerContent.box1.title}
                    </Typography>
                    <Typography variant='body2'>
                        {props.bannerContent.box1.content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item>
            <Typography variant='h5'>
                {props.bannerContent.box2.title}
            </Typography>
            <Typography variant='body2'>
                something
            </Typography>
        </Grid>
    </Grid>
}