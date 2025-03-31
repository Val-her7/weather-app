export function createStorage(data) {
    localStorage.setItem("weather", JSON.stringify(data));
}

export function getStorage() {
    const save = JSON.parse(localStorage.getItem("weather")) || [];
    return save;
}