import torch
from diffusers import StableDiffusionPipeline
from typing import Optional, Union, List

model_id = "CompVis/stable-diffusion-v1-4"
device = "cuda"


pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to(device)


def generate_image(
    prompt: Union[str, List[str]],
    height: int = 512,
    width: int = 512,
    num_inference_steps: int = 50,
    guidance_scale: float = 7.5,
    negative_prompt: Optional[Union[str, List[str]]] = None,
    num_images_per_prompt: Optional[int] = 1,
):
    images = pipe(prompt=prompt, height=height, width=width, num_inference_steps=num_inference_steps,
                  guidance_scale=guidance_scale, num_images_per_prompt=num_images_per_prompt,
                  negative_prompt=negative_prompt).images
        
    for idx, image in enumerate(images):
        image.save(f"src/results/{idx}.png")

prompt = "Molly likes to eat chicken wings."
generate_image(prompt=prompt, num_images_per_prompt=2)
