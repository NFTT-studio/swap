import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Router from "./router"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
)
