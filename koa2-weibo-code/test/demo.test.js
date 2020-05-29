function add(a, b) {
    return a + b
}
test('1+2=3', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
})