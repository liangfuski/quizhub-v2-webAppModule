import { getQuizList } from "@/api/route";
import { Card, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import QuizInfoCard from "@/component/QuizInfoCard";

export default async function Home() {

  const quizes = await getQuizList();

  return (
    // <Grid container rowSpacing={2} columnSpacing={1}>
    //   {quizes.map(q => (
    //     <Grid key={q._id} size={4}>
    //       <QuizInfoCard {...q}/>
    //     </Grid>
    //   ))}
    // </Grid>
    // pinterest style
    <Box sx={{
      columnCount: { xs:2, md:3 }, 
      columnGap: "1rem" }}>
      {quizes.map(q => (
        <Box key={q._id} sx={{marginBottom: "1rem"}}>
          <QuizInfoCard {...q}/>
        </Box>
      ))}
    </Box>
  );
}
