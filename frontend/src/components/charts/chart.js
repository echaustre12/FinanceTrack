export function buildAccumulatedFlow(transactions) {
    const daily = {};

    transactions.forEach((t) => {
        const day = t.date.slice(8, 10);

        daily[day] ??= 0;

        daily[day] += t.type === "income"
            ? t.amount
            : -t.amount;
    });

    let accumulated = 0;

    return Object.entries(daily)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([day, value]) => ({
            label: day,
            value: accumulated += value
        }));
}