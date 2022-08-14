import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';

export default function BodyBanner(props) {
    const { bannerContent } = props;
    const theme = useTheme();

    return <Grid container spacing={2}>
        <Grid item>
            <Paper sx={{ p: 2, bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
                <Typography variant='h5'>
                    {bannerContent.box1.title}
                </Typography>
                <Typography variant='body2'>
                    {bannerContent.box1.content}
                </Typography>
            </Paper>
        </Grid>
        <Grid item>
            <Typography variant='h5'>
                {bannerContent.box2.title}
            </Typography>
            {bannerContent.box2.contact.map((info) => {
                switch (info.type) {
                    case 'email':
                        return <IconButton
                            aria-label='phone'
                            onClick={(e) => {
                                window.location.href = info.value;
                                e.preventDefault();
                            }}
                        >
                            <MailIcon />
                        </IconButton>
                    case 'linkedin':
                        return <IconButton aria-label='linkedin' href={info.value}>
                            <LinkedInIcon />
                        </IconButton>
                    case 'reddit':
                        return <IconButton aria-label='reddit' href={info.value}>
                            <RedditIcon />
                        </IconButton>
                    case 'twitter':
                        return <IconButton aria-label='twitter' href={info.value}>
                            <TwitterIcon />
                        </IconButton>
                    case 'facebook':
                        return <IconButton aria-label='twitter' href={info.value}>
                            <FacebookIcon />
                        </IconButton>
                    case 'github':
                        return <IconButton aria-label='github' href={info.value}>
                            <GitHubIcon />
                        </IconButton>
                    default:
                        return <Typography variant='body2'>
                            {info.type + ": " + info.value + "\n"}
                        </Typography>
                }
            })}
        </Grid>
    </Grid>
}