// Minimal markdown -> JSX renderer. No deps. Security-safe: no dangerouslySetInnerHTML.
import React from 'react'

function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

function renderInline(text, key = 0) {
  const parts = []
  let remaining = text
  let idx = 0

  while (remaining.length > 0) {
    // Image: ![alt](url)
    const img = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
    if (img) {
      parts.push(<img key={`${key}-${idx++}`} src={img[2]} alt={img[1]} className="post-img" loading="lazy" />)
      remaining = remaining.slice(img[0].length); continue
    }
    // Link: [text](url)
    const link = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (link) {
      parts.push(<a key={`${key}-${idx++}`} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>)
      remaining = remaining.slice(link[0].length); continue
    }
    // Auto-link: bare URL (http://... or https://...)
    const autoLink = remaining.match(/^(https?:\/\/[^\s<>()[\]]+)/)
    if (autoLink) {
      parts.push(<a key={`${key}-${idx++}`} href={autoLink[1]} target="_blank" rel="noopener noreferrer">{autoLink[1]}</a>)
      remaining = remaining.slice(autoLink[0].length); continue
    }
    // Bold: **text**
    const bold = remaining.match(/^\*\*([^*]+)\*\*/)
    if (bold) {
      parts.push(<strong key={`${key}-${idx++}`}>{bold[1]}</strong>)
      remaining = remaining.slice(bold[0].length); continue
    }
    // Italic: *text*
    const italic = remaining.match(/^\*([^*]+)\*/)
    if (italic) {
      parts.push(<em key={`${key}-${idx++}`}>{italic[1]}</em>)
      remaining = remaining.slice(italic[0].length); continue
    }
    // Plain character (find next special)
    const nextSpecial = remaining.search(/(\*|!\[|\[|https?:\/\/)/)
    if (nextSpecial === -1) { parts.push(remaining); break }
    if (nextSpecial > 0) { parts.push(remaining.slice(0, nextSpecial)); remaining = remaining.slice(nextSpecial) }
    else { parts.push(remaining[0]); remaining = remaining.slice(1) }
  }
  return parts
}

export function renderMarkdown(src) {
  if (!src) return null
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Blank line
    if (/^\s*$/.test(line)) { i++; continue }

    // YouTube URL alone on a line -> embed
    const trimmed = line.trim()
    if (/^https?:\/\//.test(trimmed) && !trimmed.includes(' ')) {
      const yt = youtubeId(trimmed)
      if (yt) {
        blocks.push(
          <div key={i} className="post-video-embed">
            <iframe
              src={`https://www.youtube.com/embed/${yt}`}
              title="YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
        i++; continue
      }
    }

    // Video file: ![video](url)
    const videoLine = line.match(/^!\[video\]\(([^)]+)\)$/)
    if (videoLine) {
      blocks.push(<video key={i} src={videoLine[1]} controls className="post-video" />)
      i++; continue
    }

    // H1: # text
    if (/^#\s+/.test(line)) { blocks.push(<h1 key={i}>{renderInline(line.replace(/^#\s+/, ''), i)}</h1>); i++; continue }
    // H2: ## text
    if (/^##\s+/.test(line)) { blocks.push(<h2 key={i}>{renderInline(line.replace(/^##\s+/, ''), i)}</h2>); i++; continue }
    // H3: ### text
    if (/^###\s+/.test(line)) { blocks.push(<h3 key={i}>{renderInline(line.replace(/^###\s+/, ''), i)}</h3>); i++; continue }

    // Horizontal rule: ---
    if (/^---+$/.test(line)) { blocks.push(<hr key={i} />); i++; continue }

    // Blockquote: > text (collect consecutive lines)
    if (/^>\s?/.test(line)) {
      const quoted = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      blocks.push(<blockquote key={`q-${i}`}>{renderInline(quoted.join(' '), i)}</blockquote>)
      continue
    }

    // Unordered list: - item
    if (/^-\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(<li key={i}>{renderInline(lines[i].replace(/^-\s+/, ''), i)}</li>)
        i++
      }
      blocks.push(<ul key={`ul-${i}`}>{items}</ul>)
      continue
    }

    // Paragraph: group lines until blank / special
    const para = [line]
    let j = i + 1
    while (j < lines.length && !/^\s*$/.test(lines[j]) && !/^(#{1,3}\s|-\s|>|---)/.test(lines[j])) {
      para.push(lines[j]); j++
    }
    blocks.push(<p key={i}>{renderInline(para.join(' '), i)}</p>)
    i = j
  }

  return blocks
}
