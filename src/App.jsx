import * as React from "react";
import Container from "@mui/material/Container";
import {Box} from "@mui/material";
import { Content } from "./components/Content";
import { AppHeader } from "./components/AppHeader";
import AppMenu from './components/AppMenu';

import { ContextProvider } from "./context/ContextProvider";
import { AstarApiProvider } from "./context/AstarApiProvider";
import { PhalaApiProvider } from "./context/PhalaApiProvider";
import { PhatContractProvider } from "./context/PhatContractProvider";
import { AstarContractProvider } from "./context/AstarContractProvider";

import { Grid } from "@mui/material";
import './assets/style.css';

export default function App() {
  return (
    <ContextProvider>
      <PhalaApiProvider>
        <AstarApiProvider>
          <PhatContractProvider>
            <AstarContractProvider>
              <Container sx={{pt:2}} maxWidth="lg">
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <AppHeader /> 
                  </Grid>
                  <Grid item xs={3} sx={{margin:'auto'}}>
                    <Box> <AppMenu /></Box>
                  </Grid>
                  <Grid sx={{marginBottom: "30px"}} item xs={12}>
                    <Content />
                  </Grid>
                  
                </Grid>
              </Container>
            </AstarContractProvider>
          </PhatContractProvider>
        </AstarApiProvider>
      </PhalaApiProvider>
    </ContextProvider>
  );
}
