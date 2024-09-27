import { quiz } from "@/type"
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function QuizInfoCard({ title, description, author }: quiz) {
    // const theme = useTheme();
    return (
        <Card
        sx={{
            border: "1px solid transparent", 
            transition: "border-color 0.3s", 
            "&:hover": {
                borderColor: `primary.light`, 
                boxShadow: "none",
                ".last": {
                    color: "primary.light"
                }
            },
            }}>
            <CardContent >
                <Typography 
                    variant="h5"
                    // noWrap 
                    sx={{color: "text.primary", mb:1}}>
                    {title}
                </Typography>
                <Typography 
                    variant="body1" sx={{color: "text.secondary"}}> 
                    {description}
                </Typography>
                <Box
                    sx={{display: "flex", justifyContent: "flex-end", mt: 3}}>
                    <Typography 
                        variant="body1"
                        className="last" 
                        sx={{
                            color: "primary.dark",
                            }}
                        >
                        By {author}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}  