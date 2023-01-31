import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

// should add both the following packages separately 
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, SSR, Vignette } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import Drunk from './Drunk'
import { useRef } from 'react'

export default function Experience()
{
    const drunkRef = useRef()
    const { frequency, amplitude } = useControls({
        frequency: { value: 2, min: 0, max: 20 },
        amplitude: { value: .1, min: 0, max: 1 }
    })
    // const ssrProps = useControls({
    //     temporalResolve: true,
    //     STRETCH_MISSED_RAYS: true,
    //     USE_MRT: true,
    //     USE_NORMALMAP: true,
    //     USE_ROUGHNESSMAP: true,
    //     ENABLE_JITTERING: true,
    //     ENABLE_BLUR: true,
    //     temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    //     temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    //     maxSamples: { value: 0, min: 0, max: 1 },
    //     resolutionScale: { value: 1, min: 0, max: 1 },
    //     blurMix: { value: 0.5, min: 0, max: 1 },
    //     blurKernelSize: { value: 8, min: 0, max: 8 },
    //     blurSharpness: { value: 0.5, min: 0, max: 1 },
    //     rayStep: { value: 0.3, min: 0, max: 1 },
    //     intensity: { value: 1, min: 0, max: 5 },
    //     maxRoughness: { value: 0.1, min: 0, max: 1 },
    //     jitter: { value: 0.7, min: 0, max: 5 },
    //     jitterSpread: { value: 0.45, min: 0, max: 1 },
    //     jitterRough: { value: 0.1, min: 0, max: 1 },
    //     roughnessFadeOut: { value: 1, min: 0, max: 1 },
    //     rayFadeOut: { value: 0, min: 0, max: 1 },
    //     MAX_STEPS: { value: 20, min: 0, max: 20 },
    //     NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    //     maxDepthDifference: { value: 3, min: 0, max: 10 },
    //     maxDepth: { value: 1, min: 0, max: 1 },
    //     thickness: { value: 10, min: 0, max: 10 },
    //     ior: { value: 1.45, min: 0, max: 2 }
    // })

    return <>
        {/* this added so vignette visible on all corners, default bkgd is transparent */}
        <color args={ [ 0xffffff ] } attach="background" /> 
        
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
            {/* <Bloom
                // threshold for effect, need color channels to be above .9
                // when in doubt be subtle
                mipmapBlur // required to make bloom effect 'realistic' - creates actual bloom effect like a light would
                intensity={ .5 }
                luminanceThreshold={ 0 }
            /> */}
            {/* <DepthOfField // not great for performance
                // these values are in normalized space, 0 - 1 only
                focusDistance={ .025 }
                focalLength={ .025 }

                bokehScale={ 6 }
            /> */}
            {/* <SSR
                { ...ssrProps }
            /> */}
            <Drunk
                ref={ drunkRef }
                frequency={ frequency }
                amplitude={ amplitude }
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
            <meshStandardMaterial // make basic material if want more uniformity in glow effect, better for performance 
                // color={[ 1.5, 1, 4 ]}

                // another way to accomplish glow effect with color
                color='mediumpurple'
                // emissive='orange'
                // emissiveIntensity={ 2 }

                toneMapped={ false } // default toneMapping clamps color spectrum, need to turn off for bloom effect
            />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" 
                metalness={ 0 }
                roughness={ 0 }
            />
        </mesh>

    </>
}