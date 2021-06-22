import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
//@ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji'
import emoji from 'remark-emoji'
import externalLinks from 'remark-external-links'
//@ts-ignore
import headerId from 'remark-heading-id'
//@ts-ignore
import hints from 'remark-hint'
//@ts-ignore
import oembed from '@agentofuser/remark-oembed'
//@ts-ignore
import stripBadge from 'remark-strip-badges'
import twemoji from 'remark-emoji'
import toc from 'remark-toc'

export const previewOptions: MarkdownPreviewProps = {
  remarkPlugins: [
    a11yEmoji,
    emoji,
    externalLinks,
    headerId,
    hints,
    oembed,
    stripBadge,
    twemoji,
    toc,
  ],
}
