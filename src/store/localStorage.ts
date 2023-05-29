export const loadState = (): any | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Failed to load state from Local Storage:', error);
        return undefined;
    }
};

export const saveState = (state: any): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        console.error('Failed to save state to Local Storage:', error);
    }
};