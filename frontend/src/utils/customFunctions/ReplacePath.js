export const replacePath = (path) => {
    let existingPath = [{ path: 'qna', switchPath: 'question_and_answer' },{ path: 'subscription', switchPath: 'subscribe' },{ path: 'commission', switchPath: 'commission_history' }]
    let pathObj = existingPath.find((elem) => elem.path == path)
    return pathObj?.switchPath ? pathObj?.switchPath : path
}