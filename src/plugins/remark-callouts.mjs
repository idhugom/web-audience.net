import { visit } from 'unist-util-visit';

/**
 * Transforms container directives (:::info, :::tip, :::warning, :::success,
 * :::danger, :::note, :::key) written by the content pipeline into styled
 * <aside> callout blocks. The first `[label]` becomes the callout title.
 */
const LABELS = {
  info: 'Bon à savoir',
  tip: 'Conseil',
  warning: 'Attention',
  danger: 'À éviter',
  success: 'À retenir',
  note: 'Note',
  key: 'Points clés',
  stat: 'Chiffre clé',
};

const ICONS = {
  info: 'info',
  tip: 'tip',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
  note: 'note',
  key: 'key',
  stat: 'stat',
};

export function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return;
      const name = node.name;
      if (!(name in LABELS)) return;

      const data = node.data || (node.data = {});
      // Custom label via directive label: :::info[My title]
      let title = LABELS[name];
      const first = node.children[0];
      if (
        first &&
        first.type === 'paragraph' &&
        first.data &&
        first.data.directiveLabel
      ) {
        title = first.children.map((c) => c.value || '').join('') || title;
        node.children.shift();
      }

      data.hName = 'aside';
      data.hProperties = {
        class: `callout callout-${name}`,
        'data-callout': name,
        'data-icon': ICONS[name],
      };

      node.children.unshift({
        type: 'paragraph',
        data: {
          hName: 'p',
          hProperties: { class: 'callout-title' },
        },
        children: [{ type: 'text', value: title }],
      });
    });
  };
}
