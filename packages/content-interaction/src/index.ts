import { TrackerService } from '@pp-tracker-client/core';
import {
  findContentParentFromClickedElement,
  buildContentBlock,
  ContentBlock,
} from '@pp-tracker-client/content-tracking-utils';

export type ContentInteraction = {
  isEnabled: () => boolean;
  enable: () => void;
  disable: () => void;
  trackContentInteraction: (interaction: Interaction) => unknown;
};

export type Interaction = ContentBlock & {
  interaction: string;
};

export function ContentInteraction(tracker: TrackerService): ContentInteraction {
  let isEnabled = false;

  const clickHandler = ({ target: clickedElement }: MouseEvent) => {
    if (!clickedElement || !(clickedElement instanceof Element)) return;

    const contentParent = findContentParentFromClickedElement(clickedElement);
    if (!contentParent) return;

    const contentBlock = buildContentBlock(contentParent);

    trackContentInteraction({
      interaction: 'click',
      name: contentBlock.name,
      piece: contentBlock.piece,
      target: contentBlock.target,
    });
  };

  const trackContentInteraction = ({ interaction, name, piece, target }: Interaction) => {
    return tracker.send({
      c_i: interaction,
      c_n: name,
      c_p: piece,
      c_t: target,
    });
  };

  return {
    isEnabled: () => isEnabled,

    enable: () => {
      document.addEventListener('click', clickHandler);
      isEnabled = true;
    },

    disable: () => {
      document.removeEventListener('click', clickHandler);
      isEnabled = false;
    },

    trackContentInteraction,
  };
}
