# Physics Interactive Site (v2)

This is a web project built to show and calculate different concepts in classical mechanics, specifically focusing on energy and work. It was created as an interactive tool for physics concepts like hooke's law, kinetic energy, and energy transformation.

Live Site: [https://carrot7429.github.io/physics-site-v2/](https://carrot7429.github.io/physics-site-v2/)

---

## 🧭 What's on the Site

### 1. Spring / Elastic Station
* **What it does:** Calculates spring formulas like $F = kx$ and $E_{elastic} = \frac{1}{2}kx^2$.
* **How it works:** You can change the "Solve for" toggle to isolate different variables ($E$, $k$, or $x$). The spring drawing on the right changes its bounciness and compression based on the numbers you input on the sliders. You can also drag the block with your mouse to change displacement manually.

### 2. Kinetic Energy Sandbox
* **What it does:** Calculates kinetic energy ($KE = \frac{1}{2}mv^2$), mass, or velocity depending on what variable you want to solve for.
* **How it works:** Moving the sliders updates the math formula box instantly. A blue block at the bottom slides back and forth at a speed that matches the velocity value you chose.

### 3. Wind-up Toy Simulator
* **What it does:** Visually tracks how potential spring energy transforms into kinetic energy, and eventually turns into thermal energy (heat/friction) as a toy car comes to a stop.
* **How it works:** Clicking "Wind Up" loads the energy up to 100%. Clicking "Release" plays the animation. To make it more realistic, the duration of the run randomly varies slightly (+ or - 0.5 seconds) every time you click it. A built-in stopwatch calculates the live time and total wattage/power output.

---

## 🛠️ The Tools Used

* **React & TypeScript:** The structural layout.
* **Vite:** The setup that compiles and runs the local project code.
* **Tailwind CSS:** Used for simple styling, borders, and margins.
* **Framer Motion:** Used to handle the spring animations and moving blocks.
* **Radix UI:** Behind-the-scenes helpers to make the sliders and toggles work smoothly.

---

## 💻 Running it on Your Computer

If you want to download and check out the code locally:

1. Clone or download the repository:
   ```bash
   git clone [https://github.com/Carrot7429/physics-site-v2.git](https://github.com/Carrot7429/physics-site-v2.git)
   cd physics-site-v2