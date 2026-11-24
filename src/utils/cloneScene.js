// Deep-clones a loaded GLTF scene, including its materials, so that two
// components using the same model (e.g. the scroll scene on Home and the
// interactive viewer on the product page) never share — and accidentally
// overwrite — each other's colors.
export function cloneSceneWithMaterials(scene) {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
        if (child.isMesh) {
            child.material = Array.isArray(child.material)
                ? child.material.map((m) => m.clone())
                : child.material.clone();
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return cloned;
}