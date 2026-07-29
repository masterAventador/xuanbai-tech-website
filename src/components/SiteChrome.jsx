"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CaretDown,
  Check,
  CheckCircle,
  CubeFocus,
  List,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "首页", to: "/" },
  { label: "白泽", to: "/baize" },
  { label: "天工", to: "/tiangong" },
  { label: "千手", to: "/qianshou" },
];

const CONTACT_SCENES = [
  "企业 AI 中台",
  "AI 设计与内容创作",
  "桌面端 RPA 自运营",
  "综合合作",
];

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="玄白科技首页">
      <CubeFocus aria-hidden="true" weight="fill" />
      <span>玄白科技</span>
    </Link>
  );
}

function NavLinks({ onNavigate }) {
  const pathname = usePathname();
  const currentPath =
    pathname === "/" ? pathname : pathname.replace(/\/+$/, "");

  return NAV_ITEMS.map((item) => {
    const isActive = currentPath === item.to;

    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={isActive ? "nav-link is-active" : "nav-link"}
        href={item.to}
        key={item.to}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  });
}

export function SiteHeader({ onContact }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">
          <NavLinks />
          <a className="nav-link" href="/#about">
            关于我们
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="button button-quiet header-contact"
            onClick={onContact}
          >
            联系合作
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        aria-hidden={!menuOpen}
        aria-label="移动端导航"
        className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}
      >
        <NavLinks onNavigate={() => setMenuOpen(false)} />
        <a
          className="nav-link"
          href="/#about"
          onClick={() => setMenuOpen(false)}
        >
          关于我们
        </a>
      </nav>
    </header>
  );
}

function ContactSceneSelect({ onChange, value }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const choose = (scene) => {
    onChange(scene);
    setOpen(false);
  };

  return (
    <div className="custom-select" ref={rootRef}>
      <button
        aria-controls="contact-scene-options"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`想了解什么：${value}`}
        className={
          open ? "custom-select-trigger is-open" : "custom-select-trigger"
        }
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>{value}</span>
        <CaretDown aria-hidden="true" />
      </button>
      {open ? (
        <div
          aria-label="想了解什么"
          className="custom-select-options"
          id="contact-scene-options"
          role="listbox"
        >
          {CONTACT_SCENES.map((scene) => {
            const selected = scene === value;
            return (
              <button
                aria-selected={selected}
                className={selected ? "is-selected" : undefined}
                key={scene}
                onClick={() => choose(scene)}
                role="option"
                type="button"
              >
                <span>{scene}</span>
                {selected ? <Check aria-hidden="true" weight="bold" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function ContactModal({ open, onClose }) {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    scene: "企业 AI 中台",
    note: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const resetErrorStatus = () => {
    if (status === "validation-error" || status === "submit-error") {
      setStatus("idle");
    }
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    resetErrorStatus();
  };

  const updateScene = (scene) => {
    setFormState((current) => ({ ...current, scene }));
    resetErrorStatus();
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.contact.trim()) {
      setStatus("validation-error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact-leads", {
        body: JSON.stringify({
          contact: formState.contact.trim(),
          name: formState.name.trim(),
          note: formState.note.trim(),
          scene: formState.scene,
          sourcePath: window.location.pathname,
          website: formState.website,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Contact form submission failed");
      }
      setStatus("success");
    } catch {
      setStatus("submit-error");
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        aria-labelledby="contact-title"
        aria-modal="true"
        className="contact-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="关闭联系表单"
          className="dialog-close"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
        {status === "success" ? (
          <div className="success-state">
            <CheckCircle aria-hidden="true" size={48} weight="fill" />
            <h2 id="contact-title">已收到，我们会尽快联系你。</h2>
            <p>
              你的需求已经记录。正式接入前，我们会先确认业务场景和当前系统边界。
            </p>
            <button
              className="button button-primary"
              onClick={onClose}
              type="button"
            >
              好的
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">开始一次真实的业务对话</span>
            <h2 id="contact-title">和玄白科技聊聊</h2>
            <p className="dialog-lead">
              留下你的场景，我们会围绕白泽、天工或千手给出更具体的沟通建议。
            </p>
            <form className="contact-form" onSubmit={submit}>
              <label>
                <span>怎么称呼你</span>
                <input
                  autoFocus
                  name="name"
                  onChange={updateField}
                  placeholder="姓名或称呼"
                  value={formState.name}
                />
              </label>
              <label>
                <span>联系方式</span>
                <input
                  name="contact"
                  onChange={updateField}
                  placeholder="手机号、微信或邮箱"
                  value={formState.contact}
                />
              </label>
              <label className="scene-field">
                <span>想了解什么</span>
                <ContactSceneSelect
                  onChange={updateScene}
                  value={formState.scene}
                />
              </label>
              <label>
                <span>补充说明</span>
                <textarea
                  name="note"
                  onChange={updateField}
                  placeholder="可以简单描述当前最想解决的问题"
                  rows="4"
                  value={formState.note}
                />
              </label>
              <input
                aria-hidden="true"
                autoComplete="off"
                className="contact-honeypot"
                name="website"
                onChange={updateField}
                tabIndex="-1"
                value={formState.website}
              />
              {status === "validation-error" ? (
                <p className="form-error" role="alert">
                  请填写称呼和联系方式
                </p>
              ) : null}
              {status === "submit-error" ? (
                <p className="form-error" role="alert">
                  提交没有成功，请稍后再试。
                </p>
              ) : null}
              <button
                className="button button-primary"
                disabled={status === "submitting"}
                type="submit"
              >
                {status === "submitting" ? "正在提交…" : "提交联系信息"}
                <ArrowRight aria-hidden="true" />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export function SiteFooter({ onContact }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Brand />
        <p>让 AI 真正参与工作，也让自动化始终运行在清晰边界内。</p>
        <button className="text-link" onClick={onContact} type="button">
          联系玄白科技
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <div className="footer-meta">
        <span>© 2026 玄白科技</span>
        <span>白泽 · 天工 · 千手</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children }) {
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const openContact = () => setContactOpen(true);

  const handleContentClick = (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest("[data-contact-trigger]")
    ) {
      openContact();
    }
  };

  return (
    <div className="site-shell" onClick={handleContentClick}>
      <SiteHeader onContact={openContact} />
      {children}
      <SiteFooter onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
