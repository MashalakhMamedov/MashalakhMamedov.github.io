# mashalakhmamedov.github.io

The built output of my engineering portfolio, served at https://mashalakhmamedov.github.io

## What is here

Five case studies from my Mechatronics MSc at the University of Rome Tor Vergata, plus a homepage. They cover a 3 kVA single phase H bridge inverter, fire and smoke semantic segmentation, a UR5e dynamic simulation, a V2V inspired eco driving energy analysis, and a BSc mobile manipulator built in hardware.

Each case study follows the same shape: the problem, what I contributed, the method, the result, what went wrong, what I changed, and the limitations.

## How it is built

The site is generated from a single JSON content file by a small Node build script. No framework, no runtime dependency. This repository holds only the generated output.

Two rules govern what gets published. Every number on the site must trace to a named evidence file, and a build check fails if one does not. Team projects state what I did and what my teammate did, separately, so shared work is not presented as solo work.

## What is not here

Project source code, reports, CAD files and datasets are not published. Several contain student identifiers, teammate names and third party material. I am happy to walk through any of them on request.

Segmentation overlays derive from the Roboflow Fire and Smoke Segmentation dataset, used under CC BY 4.0.
