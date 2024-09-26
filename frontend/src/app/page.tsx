import { getQuizList } from "@/api/route";
import { Card } from "@mui/material";
import Grid from '@mui/material/Grid2';
import QuizInfoCard from "@/component/QuizInfoCard";

export default async function Home() {

  const quizes = await getQuizList();

  return (
    <Grid container rowSpacing={3} columnSpacing={1}>
      {quizes.map(q => (
        <Grid key={q._id} size={3}>
          <QuizInfoCard {...q}/>
        </Grid>
      ))}
    </Grid>
  );
}
