function matrixRotation(matrix: number[][], r: number): void {
    const rows: number = matrix.length;
    const cols: number = matrix[0].length;
    
    const numRings: number = Math.min(rows, cols) / 2;
    
    for (let ring: number = 0; ring < numRings; ring++) {
        const ringElements: number[] = [];
        
        for (let i: number = ring; i < rows - ring; i++) {
            ringElements.push(matrix[i][ring]);
        }
        for (let j: number = ring + 1; j < cols - ring; j++) {
            ringElements.push(matrix[rows - ring - 1][j]);
        }
        for (let i: number = rows - ring - 2; i >= ring; i--) {
            ringElements.push(matrix[i][cols - ring - 1]);
        }
        for (let j: number = cols - ring - 2; j > ring; j--) {
            ringElements.push(matrix[ring][j]);
        }
        
        const shift: number = r % ringElements.length;
        
        const rotatedElements: number[] = [...ringElements.slice(-shift), ...ringElements.slice(0, -shift)];
        
        let index: number = 0;
        for (let i: number = ring; i < rows - ring; i++) {
            matrix[i][ring] = rotatedElements[index++];
        }
        for (let j: number = ring + 1; j < cols - ring; j++) {
            matrix[rows - ring - 1][j] = rotatedElements[index++];
        }
        for (let i: number = rows - ring - 2; i >= ring; i--) {
            matrix[i][cols - ring - 1] = rotatedElements[index++];
        }
        for (let j: number = cols - ring - 2; j > ring; j--) {
            matrix[ring][j] = rotatedElements[index++];
        }
    }
    
    for (let i: number = 0; i < rows; i++) {
        console.log(matrix[i].join(' '));
    }
}

