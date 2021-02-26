export function fragment(node: HTMLTemplateElement) {
    node.parentElement.appendChild(node.content);
    node.parentElement.removeChild(node);

    return {
        destroy() {
            if (node && node.parentElement) {
                node.parentElement.removeChild(node.content);
            }
        },
    };
}