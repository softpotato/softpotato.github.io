import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function BodyBanner(props) {
    const { bannerContent } = props;

    return <Grid container spacing={2}>
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant='h5'>
                        {bannerContent.box1.title}
                    </Typography>
                    <Typography variant='body2'>
                        {bannerContent.box1.content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item>
            <Typography variant='h5'>
                {bannerContent.box2.title}
            </Typography>
            {bannerContent.box2.contact.map((info) => {
                return <Typography variant='body2'>
                    {info.type + ": " + info.value + "\n"}
                </Typography>
            })}
        </Grid>
    </Grid>
}