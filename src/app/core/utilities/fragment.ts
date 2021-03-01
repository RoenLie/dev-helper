export function fragment(node: HTMLTemplateElement) {
    node.parentElement.appendChild(node.content);
    node.setAttribute("style", "display: none;");

    return {
        destroy() {
            if (node && node.parentElement)
                node.parentElement.removeChild(node.content);
        },
    };
}