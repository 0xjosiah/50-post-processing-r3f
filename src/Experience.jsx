import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

// should add both the following packages separately 
import { Bloom, EffectComposer, Glitch, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'

export default function Experience()
{
    return <>
        {/* this added so vignette visible on all corners, default bkgd is transparent */}
        <color args={ [ 0x000000 ] } attach="background" /> 
        
        {/* this is typically housed in separate component, often called 'Effects' */}
        <EffectComposer
            multisampling={ 8 } // aliasing controls, default is 8
        >
            {/* <Vignette
                offset={ .3 }
                darkness={ .9 }
                blendFunction={ BlendFunction.NORMAL }
            /> */}
            {/* <Glitch
                delay={[ .5, 1 ]} // ranges, .5 sec delay to 1 sec delay
                duration={[ .1, .3 ]}
                strength={[ .2, .4 ]}
                mode={ GlitchMode.CONSTANT_MILD }
            /> */}
            {/* <Noise
                premultiply // typically looks best, add this then play with blend fns to find best result
                // the following are most used blend fns
                blendFunction={ BlendFunction.SOFT_LIGHT }
                // blendFunction={ BlendFunction.AVERAGE }
                // blendFunction={ BlendFunction.OVERLAY }
                // blendFunction={ BlendFunction.SCREEN }
            /> */}
            <Bloom
                // threshold for effect, need color channels to be above .9

            />
        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" toneMapped={ false } />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}