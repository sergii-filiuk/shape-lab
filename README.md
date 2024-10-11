# Shape Lab

You can play with project here - [DEMO](https://sergii-filiuk.github.io/shape-lab/dist/index.html)

This provides a minimal setup to get working the Shape Lab.

- install dependencies and packages:

```js
npm install
```

- run the project:

```js
npm run dev
```

- lint check:
```js
npm run lint
```
- test check:
```js
npm run test
```

# Project Overview: "Shape Lab"

"Shape Lab" is a meticulously designed application, leveraging a robust stack of modern technologies to offer a dynamic and interactive graphical user interface for shape manipulation and rendering. Below is a detailed summary of the key technologies and methodologies implemented.

## Technology Stack:

- **Core Technologies:** React ([React](https://react.dev/)), React Three Fiber ([R3F](https://r3f.docs.pmnd.rs/getting-started/introduction)), Zustand ([Zustand](https://zustand-demo.pmnd.rs/)), Tailwind CSS, SCSS/SCSS modules, TypeScript (TS), Jest, Vite, Eslint/TsLint/Prettier.

## Key Components:

- **Background:** This component renders a visually appealing dotted background using custom Vertex and Fragment Shaders based on a Ray Tracing approach for a refined final render.
- **Render Manager:** A versatile container that manages various rendering engines. Currently, it includes:
    - **Rasterization Renderer:** Processes scene and shapes by sorting geometries by their z-index and rendering sequentially.
    - **Instanced Rasterization Renderer:** Enhances performance through batching concepts and instanced rendering, grouping geometries by shape type for efficient processing.
    - **Ray Tracing Renderer:** A prototype renderer employing custom shaders and ray tracing to process all geometries in a single draw. Geometric data such as position, size, scale, and color are passed to shaders via DataTexture.

- **Transform Manager:** Oversees all transformations applied to shapes or groups of shapes.
- **Hover Manager:** Manages the hover interactions over shapes.
- **Selection Manager:** Handles the selection of single or multiple shapes.

## User Interface Components:

- **Right Panel:** Allows users to modify the scale, position, and rotation of shapes or groups of shapes. Utilizes 'scena/react-ruler' for UI guidelines with custom implemented markers for precision.
- **Tool Bar:** Facilitates the management of various tools with considerations for future extensibility.
- **Layers and Scenes Inspector Panel:** Implemented to monitor and interact with the layering and arrangement of shapes.

## Development Approaches and Techniques:

- **Rendering Techniques:** Utilization of batching geometry, instanced rendering, ray tracing, and vector and 3D calculus.
- **State Management:** Implementation of atomic, multiple state management strategies.
- **Design Principles:** Adherence to KISS (Keep It Simple, Stupid) and SOLID principles to ensure the system architecture is modular, extensible, and easily adaptable.

## Configuration and Extensions:

The project includes industry-recommended configurations for linters and testing with Jest to ensure code quality and maintainability.

As inspiration for UI/UX have use and play with [LottieFiles Creator](https://creator.lottiefiles.com/)  :)