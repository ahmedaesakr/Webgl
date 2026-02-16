import { useEffect, useCallback } from 'react'

export default function ProjectModal({ project, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!project) return null

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal-close" onClick={onClose}>
          &times;
        </button>

        <div
          className="project-modal-banner"
          style={{ backgroundColor: project.color || '#6366f1' }}
        />

        <div className="project-modal-body">
          <h2 className="project-modal-title">{project.title}</h2>
          {project.year && (
            <span className="project-modal-year">{project.year}</span>
          )}
          <p className="project-modal-desc">{project.description}</p>

          <div className="project-modal-tech">
            {project.tech?.map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
          </div>

          <div className="project-modal-links">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-link live"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-link github"
              >
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
