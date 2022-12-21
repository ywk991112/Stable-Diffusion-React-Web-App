import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import myimage from './results/0.png'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [negPrompt, setNegPrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [num, setNum] = useState(1);
  const [value, setValue] = useState(50);
  const [images, setImages] = useState([]);

  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };
  const handleNumChange = (event) => {
    setNum(event.target.value);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 500) {
      setValue(500);
    }
  };
  
  const handleSubmit = async (e) => {
    fetch("/generate", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        negPrompt: negPrompt,
        width: width,
        height: height,
        num: num,
        value: value,
      })
    }).then(
      res => res.json()
    ).then(
      data => {
        displayImage();
      }
    )
  };

  const displayImage = () => {
    let ids = [];
    for (let step = 0; step < num; step++) {
      ids.push(step);
    }
    setImages(ids);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Stable Diffusion
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ '& .MuiTextField-root': { m: 1}}} >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField required fullWidth id="prompt" label="Prompt" variant="outlined" onChange={(e) => setPrompt(e.target.value)} />
            <TextField required fullWidth id="neg_prompt" label="Negative Prompt" variant="outlined"  onChange={(e) => setNegPrompt(e.target.value)} />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Width</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={width}
                label="width"
                onChange={handleWidthChange}
              >
                <MenuItem value={512}>512</MenuItem>
                <MenuItem value={640}>640</MenuItem>
                <MenuItem value={768}>768</MenuItem>
                <MenuItem value={1024}>1024</MenuItem>
              </Select>
              <FormHelperText>Width of output image. Maximum size is 1024x768 or 768x1024 because of memory limits</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Height</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={height}
                label="height"
                onChange={handleHeightChange}
              >
                <MenuItem value={512}>512</MenuItem>
                <MenuItem value={640}>640</MenuItem>
                <MenuItem value={768}>768</MenuItem>
                <MenuItem value={1024}>1024</MenuItem>
              </Select>
              <FormHelperText>Height of output image. Maximum size is 1024x768 or 768x1024 because of memory limits</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <Stack spacing={2} direction="row" sx={{ m: 3 }} alignItems="center">
                <Typography id="input-slider" gutterBottom>
                  num_inference_steps
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof value === 'number' ? value : 1}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                      min={1}
                      max={500}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={value}
                      size="small"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 1,
                        max: 500,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <FormHelperText>Number of denoising steps (minimum: 1; maximum: 500)</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Num</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={num}
                label="num"
                onChange={handleNumChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
              <FormHelperText>Number of images to output. (minimum: 1; maximum: 4)</FormHelperText>
            </FormControl>
            <Stack spacing={2} direction="row" sx={{ m: 3 }}>
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </Grid>
          <Grid item xs={7}>
            <ImageList sx={{ width: 500 }} cols={1}>
              {images.map((image, id) => {
                let imagePath = "./results/" + image + ".png";
                return (
                  <ImageListItem key={id}>
                    <img
                      src={require(`${imagePath}`)}
                      loading="lazy"
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
