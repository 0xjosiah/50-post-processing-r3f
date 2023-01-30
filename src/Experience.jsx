import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { BlendFunction } from 'postprocessing'

export default function Experience()
{
    return <>
        
        {/* this is typically housed in separate component, often called 'Effects' */}
        <EffectComposer
            multisampling={ 8 } // aliasing controls, default is 8
        >
            <Vignette
                offset={ .3 }
                darkness={ .9 }
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
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}