export const withDrawBalance = async (balance: number, findId: any) => {
    findId.balance = parseFloat(findId.balance) - balance;
    findId.save()
    return findId;
}