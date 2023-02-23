import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Link as A,
  IconButton,
  Typography,
  Container,
  Stack,
  List,
  ListItemText,
} from "@mui/material";

export const About = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 1 }}>
        <Typography variant="h5">Features</Typography>
        <List>
          <ListItemText>Tells you total earned and spend money</ListItemText>
          <ListItemText>Sorting functions</ListItemText>
          <ListItemText>Filtering functions</ListItemText>
          <ListItemText>Create, Edit and Remove expenses</ListItemText>
          <ListItemText>Responsive for every devices</ListItemText>
        </List>

        <Typography variant="h5">Created this project with</Typography>
        <List>
          <ListItemText>React</ListItemText>
          <ListItemText>Material Ui</ListItemText>
          <ListItemText>Context api</ListItemText>
          <ListItemText>Typescript</ListItemText>
        </List>

        <Typography variant="h5">Find me on</Typography>
        <Stack direction="row" alignItems="center">
          <IconButton>
            <A href="https://github.com/nainghtetlinn" target="_blank">
              <GitHubIcon />
            </A>
          </IconButton>
          <IconButton>
            <A href="https://twitter.com/Naing_95" target="_blank">
              <TwitterIcon />
            </A>
          </IconButton>
          <IconButton>
            <A
              href="https://www.linkedin.com/in/naing-htet-linn-111252228/"
              target="_blank"
            >
              <LinkedInIcon />
            </A>
          </IconButton>
        </Stack>
      </Container>
    </>
  );
};
