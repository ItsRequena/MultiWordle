import { useEffect, useRef, useState } from 'react'
import { styled } from '@stitches/react'
import { useTrail, animated } from '@react-spring/web'

const Text = styled('p', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap:'10px'
})

const AppContainer = styled('div', {
  width: '800px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '1px'
})

const Container = styled('div', {
  display: 'flex',
})

const Box = styled('div', {
  position: 'relative'
})

const SharedStyles = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  backfaceVisibility: 'hidden',
  borderRadius: '5px'
}

const FrontBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#fafafa',
  border: 'solid 2px #1a1a1a',
})

const BackBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#6cab64',
  border: 'solid 2px #6cab64',
  color: '#fafafa',
})


export function Header({items, height, width, gap, font, createdBy}) {

  const isFlipped = useRef(false)

  const [trail, api] = useTrail(items.length, () => ({
    rotateX: 0,
  }))

  const handleClick = () => {
    if (isFlipped.current) {
      api.start({
        rotateX: 0,
      })
      isFlipped.current = false
    } else {
      api.start({
        rotateX: 180,
      })
      isFlipped.current = true
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleClick();
    }, 5000);

    return () => clearInterval(interval); // Limpieza
  }, [items]);

  return (
    <AppContainer>
      {createdBy && <Text style={{gap: `${gap}px`}}>CREATED BY</Text>}
      <Container style={{gap: `${gap}px`}}>
        {trail.map(({ rotateX }, i) => (
          <Box 
            style={{height: `${height}px`, width: `${width}px`}} 
            key={i}>
            <FrontBox
              key={items[i]}
              style={{
                transform: rotateX.to(val => `perspective(600px) rotateX(${val}deg)`),
                transformStyle: 'preserve-3d',
                fontWeight: `${font}`
              }}>
              <p style={{color: 'black'}}>?</p>
            </FrontBox>
            <BackBox
              style={{
                transform: rotateX.to(val => `perspective(600px) rotateX(${180 - val}deg)`),
                transformStyle: 'preserve-3d',
                fontWeight: `${font}`
              }}>
              {items[i]}
            </BackBox>
          </Box>
        ))}
      </Container>
      {createdBy && 
        <a href="https://github.com/ItsRequena" style={{marginTop:'1px'}}>
        <img 
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
          alt="GitHub Icon" 
          style={{width:'40px',  height: '40px', borderRadius: '20px'}}
        />
      </a>}
    </AppContainer>
  )
}
