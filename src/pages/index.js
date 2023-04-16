import { useState } from "react";
import Head from "next/head";
import toast from "../components/Toast";
import { ALGORITHM_TYPE, CONVERT_TYPE } from "../constants";
import ceasarAlgorithm from "../algorithms/Ceasar";
import vigenereAlgorithm from "../algorithms/Vigenere";
import {
  Box,
  Select,
  MenuItem,
  Card,
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Divider,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const initFormData = { code: "", key: "" };

export default function Home() {
  const [algorithm, setAlgorithm] = useState(ALGORITHM_TYPE.CEASAR);
  const [convertType, setConvertType] = useState(CONVERT_TYPE.ENCODE);
  const [formData, setFormData] = useState(initFormData);
  const [convertResult, setConvertResult] = useState("");

  const handleChangeAlgorithm = (event) => {
    setAlgorithm(event.target.value);
  };
  const handleChangeType = (event) => {
    setConvertType(event.target.value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let codeResult = "";
    const code = formData.code;
    const key = formData.key;

    // check valid key input
    if (
      (algorithm === ALGORITHM_TYPE.CEASAR &&
        ceasarAlgorithm.validateKey(key)) ||
      (algorithm === ALGORITHM_TYPE.VIGENERE &&
        vigenereAlgorithm.validateKey(key))
    ) {
      if (
        algorithm === ALGORITHM_TYPE.CEASAR &&
        convertType === CONVERT_TYPE.ENCODE
      ) {
        codeResult = ceasarAlgorithm.encode(code, Number(key));
      }
      if (
        algorithm === ALGORITHM_TYPE.CEASAR &&
        convertType === CONVERT_TYPE.DECODE
      ) {
        codeResult = ceasarAlgorithm.decode(code, Number(key));
      }
      if (
        algorithm === ALGORITHM_TYPE.VIGENERE &&
        convertType === CONVERT_TYPE.ENCODE
      ) {
        codeResult = vigenereAlgorithm.encode(code, key);
      }
      if (
        algorithm === ALGORITHM_TYPE.VIGENERE &&
        convertType === CONVERT_TYPE.DECODE
      ) {
        codeResult = vigenereAlgorithm.decode(code, key);
      }
      // set result to render UI
      setConvertResult(codeResult);
    } else {
      // show error message when key is error
      toast({
        type: "error",
        message: "Invalid input value (ceasar is number, vigenere is text)!",
      });
    }
  };
  return (
    <div>
      <Head>
        <title>Information Security</title>
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", boxShadow: 3 }}
      >
        <Grid item xs={3}>
          <Card sx={{ minWidth: 275, p: 4, borderRadius: 6 }}>
            <Typography
              style={{
                textTransform: "uppercase",
                fontSize: "1.6rem",
                marginBottom: 20,
              }}
              align="center"
              variant="h3"
            >
              information security
            </Typography>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    width: 500,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <FormControl>
                    <InputLabel id="algorithm-select-label">
                      Algorithm
                    </InputLabel>
                    <Select
                      labelId="algorithm-select-label"
                      id="algorithm-select"
                      label="Algorithm"
                      value={algorithm}
                      onChange={handleChangeAlgorithm}
                    >
                      <MenuItem value={1}>Ceasar</MenuItem>
                      <MenuItem value={2}>Vigenere</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                      labelId="type-select-label"
                      id="type-select"
                      label="Type"
                      value={convertType}
                      onChange={handleChangeType}
                    >
                      <MenuItem value={1}>Encode</MenuItem>
                      <MenuItem value={2}>Decode</MenuItem>
                    </Select>
                  </FormControl>
                  <Divider />
                  <TextField
                    required
                    value={formData.code}
                    name="code"
                    label={"Code"}
                    id="code"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    value={formData.key}
                    name="key"
                    label={"Key"}
                    id="key"
                    onChange={handleChange}
                  />
                  <Box>
                    <InputLabel sx={{ marginBottom: 2, textAlign: "center" }}>
                      RESULT
                    </InputLabel>
                    <TextField
                      value={convertResult}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      id="encode"
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      type="submit"
                      sx={{ borderRadius: 7, paddingX: 6, paddingY: 2 }}
                      variant="contained"
                      size="la"
                    >
                      execute
                    </Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
