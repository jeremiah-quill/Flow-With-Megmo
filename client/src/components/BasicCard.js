import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard({date, time}) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Yoga Sculpt
          </Typography>
          <Typography variant="h5" component="div" sx={{mb: 0}}>
            {/* turn full date into "15th" style date */}
            15th 
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* turn full date into month only */}
            January
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {time}am
          </Typography>
          {/* <Typography variant="body2">
            $15
          </Typography> */}
        </CardContent>
      </Card>
    );
  }