import React, { useEffect, useRef, useState } from 'react'


const types = [
  {
    name: 'shrtco.de',
    url: 'short_link'
  },
  {
    name: '9qr.de',
    url: 'short_link2'
  },
  {
    name: 'shiny.link',
    url: 'short_link3'
  },
]
const App = () => {
  const [link, setLink] = useState();
  const [result, setResult] = useState('');
  const [clickId, setClickId] = useState(0);

  const [showLink, setShowLink] = useState('');
  const ref = useRef();

  const handleShorten = () => {
    setLink(ref.current.value);
    setShowLink(result[types[clickId].url])
  }
  const handleShowLink = (id) => {
    const shortLink = result[types[id].url];
    setShowLink(shortLink)
    setClickId(id)
    console.log(shortLink)
  }

  useEffect(() => {
    if (link) {
      fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
        .then(res => res.json())
        .then(data => setResult(data.result))
    }

  }, [link])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <h1 style={{color: 'white'}}>The privacy-friendly URL Shortener</h1>
      <div className='input-container'>
        <div>
          <label>
            Enter a link: <input ref={ref} />
          </label>
          <button onClick={handleShorten}>Shorten Link</button>
        </div>
        <div >
          {
           types.map(({ name }, id) => (
              <button
                key={id}
                onClick={() => handleShowLink(id)}
                className={id === clickId ? 'btn blue' : 'btn'}
              >{name}</button>
            ))
          }
        </div>
      </div>

      <div className="generate">
        
            <>
              <h2>Link generated</h2>
              <p style={{fontSize: '20px'}}>{showLink}</p>
            </>
      </div>
    </div>
  )
}

export default App