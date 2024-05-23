# Reatc Vite Projects

## 1. Color Changer

<img src = "https://github.com/Sandeep-coder-app/ReactViteProjects/blob/main/colorChanger/src/assets/Screenshot%202024-03-02%20105756.png" />

``` javascript
function App() {
  const [color, setColor] = useState("teal")

  return (
    <div className="w-full h-screen duration-200" style={{backgroundColor: color}}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button onClick={ () => setColor('red')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "red"}}>Red</button>
          <button onClick={ () => setColor('green')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "green"}}>Green</button>
          <button onClick={ () => setColor('blue')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "Blue"}}>Blue</button>
          <button onClick={ () => setColor('olive')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "olive"}}>Olive</button>
          <button onClick={ () => setColor('gray')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "gray"}}>Gray</button>
          <button onClick={ () => setColor('yellow')} className="outline-none px-4 py-1 rounded-full text-black shadow-lg" style={{backgroundColor: "yellow"}}>Yellow</button>
          <button onClick={ () => setColor('pink')} className="outline-none px-4 py-1 rounded-full text-black shadow-lg" style={{backgroundColor: "pink"}}>Pink</button>
          <button onClick={ () => setColor('purple')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "purple"}}>Purple</button>
          <button onClick={ () => setColor('lavender')} className="outline-none px-4 py-1 rounded-full text-black shadow-lg" style={{backgroundColor: "lavender"}}>Lavender</button>
          <button onClick={ () => setColor('white')} className="outline-none px-4 py-1 rounded-full text-black shadow-lg" style={{backgroundColor: "white"}}>White</button>
          <button onClick={ () => setColor('black')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "Black"}}>Black</button>
        </div>
      </div>
    </div>
  )
}
```

## 2. Password Generator

<img src = "https://github.com/Sandeep-coder-app/ReactViteProjects/blob/main/passwordGenerator/src/assets/Screenshot%202024-03-02%20133441.png" />

