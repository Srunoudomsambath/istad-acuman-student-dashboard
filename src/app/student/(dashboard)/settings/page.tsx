"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { studentProfile } from "@/lib/mock/student";

export default function SettingsPage() {
  const [publicProfile, setPublicProfile] = useState(studentProfile.isPublic);
  const [abroad, setAbroad] = useState(studentProfile.isAbroad);
  const [employed, setEmployed] = useState(studentProfile.isEmployed);

  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Student setting
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Update profile metadata and scholarship options
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              UI-only form fields for the student profile, contact details, and
              academic visibility settings.
            </p>
          </div>
          <div className="rounded-2xl border bg-background/60 p-5">
            <Label htmlFor="avatar">Avatar upload</Label>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed p-4">
              <div className="flex-1">
                <p className="text-sm font-medium">No file chosen</p>
                <p className="text-sm text-muted-foreground">
                  Upload a profile avatar for the scholar profile.
                </p>
              </div>
              <Button variant="secondary" className="gap-2">
                <Upload className="size-4" />
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Gender</Label>
              <Select defaultValue={studentProfile.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="personal-number">Personal Number</Label>
              <Input id="personal-number" defaultValue={studentProfile.personalNumber} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family-number">Family Number</Label>
              <Input id="family-number" defaultValue={studentProfile.familyNumber} />
            </div>
            <div className="space-y-2">
              <Label>Guardian Relationship</Label>
              <Select defaultValue={studentProfile.guardianRelationship}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mother">Mother</SelectItem>
                  <SelectItem value="Father">Father</SelectItem>
                  <SelectItem value="Guardian">Guardian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" defaultValue={studentProfile.dob} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue={studentProfile.bio}
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>Academic visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between rounded-2xl border bg-background/70 p-4">
              <div className="space-y-1">
                <p className="font-medium">Public profile</p>
                <p className="text-sm text-muted-foreground">
                  Show scholar profile in the portal.
                </p>
              </div>
              <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border bg-background/70 p-4">
              <div className="space-y-1">
                <p className="font-medium">Scholar abroad</p>
                <p className="text-sm text-muted-foreground">
                  Enable this option to set up scholar abroad details.
                </p>
              </div>
              <Switch checked={abroad} onCheckedChange={setAbroad} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border bg-background/70 p-4">
              <div className="space-y-1">
                <p className="font-medium">Employment status</p>
                <p className="text-sm text-muted-foreground">
                  Mark the student as employed for career tracking.
                </p>
              </div>
              <Switch checked={employed} onCheckedChange={setEmployed} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="place-of-birth">Place of Birth</Label>
                <Input
                  id="place-of-birth"
                  defaultValue={studentProfile.placeOfBirth}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-address">Current Address</Label>
                <Input
                  id="current-address"
                  defaultValue={studentProfile.currentAddress}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline">Reset</Button>
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
