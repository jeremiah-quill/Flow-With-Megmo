import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// TODO: remove MUI, customize CSS
export default function ClassCard({ date, time }) {
	return (
		<Card variant="outlined">
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary">
					Yoga Sculpt
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: 0 }}>
					{/* turn full date into "15th" style date */}
					{date}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{/* turn full date into month only */}
					{date}
				</Typography>
				{time && (
					<Typography sx={{ fontSize: 14 }} color="text.secondary">
						{time}am
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}
