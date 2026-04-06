"use client";

import type { ChangeEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Globe2, Save } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaGithub, FaTelegramPlane } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { studentProfile } from "@/lib/mock/student";
import {
  getStoredStudentProfile,
  saveStudentProfile,
  STUDENT_PROFILE_UPDATED_EVENT,
} from "@/lib/student-profile-storage";
import type { Scholar } from "@/lib/types/student";

type PersonalDraft = {
  nickname: string;
  bio: string;
  quote: string;
  isPublic: boolean;
};

type ContactDraft = {
  telegram: string;
  facebook: string;
  github: string;
  website: string;
};

const SOCIAL_PREFIXES = {
  telegram: "t.me/",
  facebook: "facebook.com/",
  github: "github.com/",
  website: "https://",
} as const;

const DEFAULT_COVER_IMAGE = "/team.jpg";
const DEFAULT_COVER_POSITION = 46;

function stripFixedPrefix(value: string | undefined, prefix: string) {
  if (!value) return "";

  let normalizedValue = value.trim();
  const lowerPrefix = prefix.toLowerCase();

  if (prefix === "https://") {
    normalizedValue = normalizedValue.replace(/^https?:\/\//i, "");
  }

  while (normalizedValue.toLowerCase().startsWith(lowerPrefix)) {
    normalizedValue = normalizedValue.slice(prefix.length).trim();
  }

  return normalizedValue;
}

function joinFixedPrefix(prefix: string, value: string) {
  const trimmedValue = value.trim().replace(/^\/+/, "");
  if (!trimmedValue) return undefined;
  return `${prefix}${trimmedValue}`;
}

function clampCoverPosition(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function createPersonalDraft(profile: Scholar): PersonalDraft {
  return {
    nickname: profile.nickname ?? "",
    bio: profile.bio,
    quote: profile.quote,
    isPublic: profile.isPublic,
  };
}

function createContactDraft(profile: Scholar): ContactDraft {
  return {
    telegram: stripFixedPrefix(profile.telegram, SOCIAL_PREFIXES.telegram),
    facebook: stripFixedPrefix(profile.facebook, SOCIAL_PREFIXES.facebook),
    github: stripFixedPrefix(profile.github, SOCIAL_PREFIXES.github),
    website: stripFixedPrefix(profile.website, SOCIAL_PREFIXES.website),
  };
}

function SectionShell({
  title,
  description,
  footer,
  children,
}: {
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {

  return (
    <Card className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {title || description ? (
        <CardHeader className="space-y-1 px-6 py-5">
          {title ? <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle> : null}
          {description ? (
            <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className="px-6 py-0">{children}</CardContent>
      {footer ? (
        <div className="flex flex-col gap-2 border-t border-border/70 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

function InlineField({
  leading,
  value,
  placeholder,
  onChange,
}: {
  leading: ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex w-full overflow-hidden rounded-xl border border-border/70 bg-background/80">
      <div className="flex min-w-fit items-center justify-center border-r border-border/70 bg-muted/20 px-3 text-sm text-muted-foreground">
        {leading}
      </div>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 border-0 rounded-none bg-transparent px-3 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}

function SocialFieldset({
  title,
  description,
  logo,
  prefix,
  value,
  placeholder,
  onChange,
}: {
  title?: string;
  description?: string;
  logo: ReactNode;
  prefix: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="space-y-1">
        <h4 className="text-base font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <InlineField
        leading={<div className="flex items-center gap-2">{logo}<span>{prefix}</span></div>}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState(studentProfile);
  const [personalDraft, setPersonalDraft] = useState<PersonalDraft>(() =>
    createPersonalDraft(studentProfile)
  );
  const [contactDraft, setContactDraft] = useState<ContactDraft>(() =>
    createContactDraft(studentProfile)
  );
  const [isRepositioningCover, setIsRepositioningCover] = useState(false);
  const [coverDraftPosition, setCoverDraftPosition] = useState<number | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const coverDragStateRef = useRef<{ startY: number; startPosition: number; height: number } | null>(null);
  useEffect(() => {
    const syncProfile = () => {
      const nextProfile = getStoredStudentProfile();
      setProfile(nextProfile);
      setPersonalDraft(createPersonalDraft(nextProfile));
      setContactDraft(createContactDraft(nextProfile));
      setCoverDraftPosition(null);
    };

    syncProfile();
    window.addEventListener("storage", syncProfile);
    window.addEventListener(STUDENT_PROFILE_UPDATED_EVENT, syncProfile);

    return () => {
      window.removeEventListener("storage", syncProfile);
      window.removeEventListener(STUDENT_PROFILE_UPDATED_EVENT, syncProfile);
    };
  }, []);

  const handleSavePersonal = () => {
    const nextProfile: Scholar = {
      ...profile,
      nickname: personalDraft.nickname.trim() || undefined,
      bio: personalDraft.bio.trim(),
      quote: personalDraft.quote.trim(),
      isPublic: personalDraft.isPublic,
    };

    setProfile(nextProfile);
    saveStudentProfile(nextProfile);
    toast.success("Profile information saved");
  };

  const handleSaveAllSocial = () => {
    const nextProfile: Scholar = {
      ...profile,
      telegram: joinFixedPrefix(SOCIAL_PREFIXES.telegram, contactDraft.telegram),
      facebook: joinFixedPrefix(SOCIAL_PREFIXES.facebook, contactDraft.facebook),
      github: joinFixedPrefix(SOCIAL_PREFIXES.github, contactDraft.github),
      website: joinFixedPrefix(SOCIAL_PREFIXES.website, contactDraft.website),
    };

    setProfile(nextProfile);
    saveStudentProfile(nextProfile);
    toast.success("Social links saved");
  };

  const handlePickCover = () => {
    coverInputRef.current?.click();
  };

  const handleCoverFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        toast.error("Unable to read this image");
        return;
      }

      const nextProfile: Scholar = {
        ...profile,
        coverImage: reader.result,
        coverPosition: profile.coverPosition ?? DEFAULT_COVER_POSITION,
      };

      setProfile(nextProfile);
      setCoverDraftPosition(null);
      setIsRepositioningCover(false);
      saveStudentProfile(nextProfile);
      toast.success("Cover image updated");
    };

    reader.onerror = () => {
      toast.error("Unable to read this image");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleStartCoverReposition = () => {
    setCoverDraftPosition(profile.coverPosition ?? DEFAULT_COVER_POSITION);
    setIsRepositioningCover(true);
  };

  const handleCancelCoverReposition = () => {
    setCoverDraftPosition(null);
    setIsRepositioningCover(false);
    coverDragStateRef.current = null;
  };

  const handleSaveCoverPosition = () => {
    const normalizedPosition = clampCoverPosition(
      coverDraftPosition ?? profile.coverPosition ?? DEFAULT_COVER_POSITION
    );
    const nextProfile: Scholar = {
      ...profile,
      coverImage: profile.coverImage ?? DEFAULT_COVER_IMAGE,
      coverPosition: normalizedPosition,
    };

    setProfile(nextProfile);
    setCoverDraftPosition(null);
    setIsRepositioningCover(false);
    coverDragStateRef.current = null;
    saveStudentProfile(nextProfile);
    toast.success("Cover position saved");
  };

  const handleCoverPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isRepositioningCover) {
      return;
    }

    coverDragStateRef.current = {
      startY: event.clientY,
      startPosition: coverDraftPosition ?? profile.coverPosition ?? DEFAULT_COVER_POSITION,
      height: event.currentTarget.clientHeight || 1,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCoverPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = coverDragStateRef.current;

    if (!dragState || !isRepositioningCover) {
      return;
    }

    const deltaPercent = ((event.clientY - dragState.startY) / dragState.height) * 100;
    setCoverDraftPosition(clampCoverPosition(dragState.startPosition + deltaPercent));
  };

  const handleCoverPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!coverDragStateRef.current) {
      return;
    }

    coverDragStateRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const coverImage = profile.coverImage ?? DEFAULT_COVER_IMAGE;
  const coverPosition = coverDraftPosition ?? profile.coverPosition ?? DEFAULT_COVER_POSITION;
  const coverNeedsUnoptimized = coverImage.startsWith("data:");

  return (
    <div className="space-y-6">
      <SectionShell>
        <div className="space-y-4 py-5">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverFileChange}
          />

          <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
            <div
              className={`relative h-56 sm:h-64 ${isRepositioningCover ? "cursor-grab active:cursor-grabbing select-none" : ""}`}
              onPointerDown={handleCoverPointerDown}
              onPointerMove={handleCoverPointerMove}
              onPointerUp={handleCoverPointerEnd}
              onPointerCancel={handleCoverPointerEnd}
            >
              <Image
                src={coverImage}
                alt={profile.englishName ? `${profile.englishName} cover` : "Student cover"}
                fill
                unoptimized={coverNeedsUnoptimized}
                className="object-cover"
                style={{ objectPosition: `center ${coverPosition}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-slate-950/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.16),transparent_22%)]" />

              {isRepositioningCover ? (
                <div className="absolute right-4 top-4 z-20 flex items-center gap-2 overflow-hidden rounded-lg border border-white/15 bg-black/55 p-1 text-white shadow-lg backdrop-blur-md">
                  <button
                    type="button"
                    onClick={handleSaveCoverPosition}
                    className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/10"
                  >
                    Save position
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelCoverReposition}
                    className="rounded-md px-3 py-2 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="absolute right-4 top-4 z-10 flex items-center overflow-hidden rounded-lg border border-white/15 bg-black/55 text-white shadow-lg backdrop-blur-md">
                  <button
                    type="button"
                    onClick={handlePickCover}
                    className="px-4 py-2 text-sm font-medium transition hover:bg-white/10"
                  >
                    Change
                  </button>
                  <span className="h-5 w-px bg-white/15" />
                  <button
                    type="button"
                    onClick={handleStartCoverReposition}
                    className="px-4 py-2 text-sm font-medium transition hover:bg-white/10"
                  >
                    Reposition
                  </button>
                </div>
              )}

              {isRepositioningCover ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="rounded-lg border border-white/15 bg-black/45 px-4 py-2 text-sm font-medium text-white shadow-md backdrop-blur-md">
                    Drag image to reposition
                  </div>
                </div>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-16">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-end gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-background/95 bg-background shadow-xl">
                      <Image
                        src={profile.avatar}
                        alt={profile.englishName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 pb-1 text-white">
                      <p className="text-xl font-semibold tracking-tight drop-shadow-sm">{profile.englishName}</p>
                      <p className="text-sm text-white/78">
                        Avatar is locked for students. Update the cover image instead.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border/70 px-5 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Public Profile</p>
                <p className="text-xs text-muted-foreground">Visible to other users.</p>
              </div>
              <Switch
                checked={personalDraft.isPublic}
                onCheckedChange={(checked) =>
                  setPersonalDraft((current) => ({
                    ...current,
                    isPublic: checked,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        title="Profile Information"
        description="Update the student-controlled details shown on your profile page."
        footer={
          <div className="flex w-full justify-end">
            <Button type="button" size="sm" className="min-w-22 gap-2" onClick={handleSavePersonal}>
              <Save className="size-4" />
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-5">
          <div className="space-y-1.5">
            <Label htmlFor="nickname">Display Name</Label>
            <Input
              id="nickname"
              value={personalDraft.nickname}
              onChange={(event) =>
                setPersonalDraft((current) => ({
                  ...current,
                  nickname: event.target.value,
                }))
              }
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quote">Quote</Label>
            <Input
              id="quote"
              value={personalDraft.quote}
              onChange={(event) =>
                setPersonalDraft((current) => ({
                  ...current,
                  quote: event.target.value,
                }))
              }
              placeholder="Add a short quote"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={5}
              value={personalDraft.bio}
              onChange={(event) =>
                setPersonalDraft((current) => ({
                  ...current,
                  bio: event.target.value,
                }))
              }
              placeholder="Write a short bio"
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell
        title="Linked Accounts"
        description="Manage your connected social accounts."
        footer={
          <div className="flex w-full justify-end">
            <Button type="button" size="sm" className="min-w-24 gap-2" onClick={handleSaveAllSocial}>
              <Save className="size-4" />
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-5">
          <div className="grid items-start gap-x-5 gap-y-4 md:grid-cols-2">
            <SocialFieldset
              title="Telegram"
              description="Your Telegram username or profile link."
              logo={<FaTelegramPlane className="size-4 text-foreground" />}
              prefix={SOCIAL_PREFIXES.telegram}
              value={contactDraft.telegram}
              placeholder="your-telegram-id"
              onChange={(value) =>
                setContactDraft((current) => ({
                  ...current,
                  telegram: value,
                }))
              }
            />

            <SocialFieldset
              title="Facebook"
              description="Your Facebook profile link."
              logo={<FaFacebook className="size-4 text-foreground" />}
              prefix={SOCIAL_PREFIXES.facebook}
              value={contactDraft.facebook}
              placeholder="your-facebook-id"
              onChange={(value) =>
                setContactDraft((current) => ({
                  ...current,
                  facebook: value,
                }))
              }
            />

            <SocialFieldset
              title="GitHub"
              description="Your GitHub profile link."
              logo={<FaGithub className="size-4 text-foreground" />}
              prefix={SOCIAL_PREFIXES.github}
              value={contactDraft.github}
              placeholder="your-github-id"
              onChange={(value) =>
                setContactDraft((current) => ({
                  ...current,
                  github: value,
                }))
              }
            />

            <SocialFieldset
              title="Website"
              description="Your personal website or portfolio link."
              logo={<Globe2 className="size-4 text-foreground" />}
              prefix={SOCIAL_PREFIXES.website}
              value={contactDraft.website}
              placeholder="your-domain.com"
              onChange={(value) =>
                setContactDraft((current) => ({
                  ...current,
                  website: value,
                }))
              }
            />
          </div>
        </div>
      </SectionShell>
    </div>
  );
}






























