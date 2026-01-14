"use client";

// REVIEWED - 07

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClockIcon,
  ImageIcon,
  KeyIcon,
  MailIcon,
  Share2Icon,
  ShieldHalfIcon,
  ShieldUserIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUser } from "@/hooks/use-update-user";
import {
  profileSchema,
  ProfileSchema,
  updatePassSchema,
  UpdatePassSchema,
} from "@/lib/schemas/profile";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import { UserAvatar } from "../globals/user-avatar";

import { AccountDeletion } from "./account-deletion";
import { StatusBadge } from "./globals";

const ProfileAvatar = function ProfileAvatar({ user }: { user: User }) {
  const { updateUserAvatar, removeUserAvatar } = useUpdateUser();
  const doAvatarChange = async (file: File) => {
    updateUserAvatar.mutate({
      file,
      alt: `Avatar for ${user.firstName || "User"}`,
    });
  };

  return (
    <div className="flex items-center justify-start gap-5">
      <UserAvatar
        user={user}
        size="user-avatar"
        className="w-24"
        fallbackClassName="text-3xl font-light md:text-5xl"
      />

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-row items-center justify-start gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={updateUserAvatar.isPending}
            className="p-0">
            <label
              htmlFor="avatar-upload"
              className="flex cursor-pointer flex-row items-center justify-start gap-1 px-4 py-1.5">
              <ImageIcon />
              {updateUserAvatar.isPending ? "Uploading..." : "Upload"}
            </label>
          </Button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) doAvatarChange(file);
            }}
          />
          {user.avatar ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={removeUserAvatar.isPending}
              onClick={() =>
                removeUserAvatar.mutate({
                  id: isObject(user.avatar) ? user.avatar.id : user.avatar,
                })
              }>
              <XIcon />
              {removeUserAvatar.isPending ? "Removing..." : "Remove"}
            </Button>
          ) : null}
        </div>
        <Paragraph className="text-sm font-medium lg:text-sm">
          JPG or PNG. Maximum size of 5 MB.
        </Paragraph>
      </div>
    </div>
  );
};

export const ProfileSettings = function ProfileSettings({
  user,
}: {
  user: User;
}) {
  const {
    updateUser,
    updatePassword,
    resendingVerificationEmail,
    resendingVerificationPendingEmail: resendingPendingEmail,
    cancelingPendingEmail,
  } = useUpdateUser();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
      github: user.linksSocial?.github || "",
      instagram: user.linksSocial?.instagram || "",
      twitter: user.linksSocial?.twitter || "",
      linkedin: user.linksSocial?.linkedin || "",
      website: user.linksSocial?.website || "",
      showEmail: user.privacySettings?.showEmail || false,
      showActivity: user.privacySettings?.showActivity ?? true,
      showAchievements: user.privacySettings?.showAchievements ?? true,
      showOrders: user.privacySettings?.showOrders || false,
    },
  });

  const passForm = useForm<UpdatePassSchema>({
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updatePassSchema),
  });

  const onSubmitInfo = async (data: ProfileSchema) => {
    updateUser.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      bio: data.bio || "",
    });
  };

  const onSubmitSocial = async (data: ProfileSchema) => {
    updateUser.mutate({
      linksSocial: {
        github: data.github || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
        website: data.website || "",
      },
    });
  };

  const onSubmitPrivacy = async (data: ProfileSchema) => {
    updateUser.mutate({
      privacySettings: {
        showEmail: data.showEmail,
        showActivity: data.showActivity,
        showAchievements: data.showAchievements,
        showOrders: data.showOrders,
      },
    });
  };

  return (
    <div className="space-y-10">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-4 gap-1 border border-input bg-background">
          <TabsTrigger
            value="profile"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "data-[state_=_active]:bg-foreground data-[state_=_active]:text-background",
            )}>
            <UserIcon className="!size-5" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "data-[state_=_active]:bg-foreground data-[state_=_active]:text-background",
            )}>
            <Share2Icon className="!size-5" />
            <span className="hidden sm:inline">Social Links</span>
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "data-[state_=_active]:bg-foreground data-[state_=_active]:text-background",
            )}>
            <ShieldHalfIcon className="!size-5" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "data-[state_=_active]:bg-foreground data-[state_=_active]:text-background",
            )}>
            <ShieldUserIcon className="!size-5" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-10 space-y-10">
          <div className="space-y-0.5">
            <SubSectionHeading
              as="h2"
              className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              <UserIcon className="size-6 stroke-[1.5]" />
              Profile Information
            </SubSectionHeading>
            <Paragraph className="max-w-2xl text-base lg:text-base">
              Please ensure your personal details and profile picture are
              current to present your best self to our community.
            </Paragraph>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitInfo)}
              className="space-y-5">
              <ProfileAvatar user={user} />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    {user.pendingEmail ? (
                      <div className="flex w-full flex-col items-start justify-start gap-2.5 border border-amber-500/10 bg-amber-500/10 p-5">
                        <div className="flex items-center justify-start gap-2.5 text-sm font-semibold leading-none text-amber-300">
                          <ClockIcon className="size-4" />
                          <span>Email Change Pending Confirmation</span>
                        </div>
                        <div className="mb-2.5 max-w-3xl text-sm font-medium leading-relaxed text-amber-100">
                          A verification link has been sent to{" "}
                          <span className="underline underline-offset-4">
                            {user.pendingEmail}
                          </span>
                          . Kindly check your inbox to confirm and complete the
                          email update process. In case you did not initiate
                          this change, please disregard this notification.
                        </div>
                        <div className="flex w-full flex-col items-center justify-start gap-2.5 sm:flex-row">
                          <Button
                            type="button"
                            variant="default"
                            disabled={resendingPendingEmail.isPending}
                            onClick={() => resendingPendingEmail.mutate()}
                            className="w-full bg-amber-300 text-amber-950 hover:bg-amber-500 hover:text-amber-950 sm:w-auto">
                            <MailIcon />
                            {resendingPendingEmail.isPending
                              ? "Resending..."
                              : "Resend Verification Email"}
                          </Button>
                          <Button
                            type="button"
                            variant="link"
                            disabled={cancelingPendingEmail.isPending}
                            onClick={() => cancelingPendingEmail.mutate()}
                            className="w-full text-amber-100 hover:text-amber-300 sm:w-auto">
                            <XIcon />
                            {cancelingPendingEmail.isPending
                              ? "Cancelling..."
                              : "Cancel Email Change"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-start gap-2.5">
                        <StatusBadge
                          label={
                            user.accountVerified
                              ? "Your email has been successfully verified."
                              : "Your email is not yet verified."
                          }
                          className={cn({
                            "border-green-500/10 bg-green-500/10 text-green-500 hover:bg-green-500/10":
                              user.accountVerified,
                            "border-amber-500/10 bg-amber-500/10 text-amber-500 hover:bg-amber-500/10":
                              !user.accountVerified,
                          })}
                        />

                        {!user.accountVerified ? (
                          <Button
                            type="button"
                            variant="link"
                            disabled={resendingVerificationEmail.isPending}
                            onClick={() => resendingVerificationEmail.mutate()}>
                            <MailIcon />
                            {resendingVerificationEmail.isPending
                              ? "Sending verification..."
                              : "Resend verification email"}
                          </Button>
                        ) : null}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        maxLength={500}
                        placeholder="Introduce yourself or share your aspirations..."
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/500 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={updateUser.isPending}>
                {updateUser.isPending ? "Saving..." : "Save Info"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="social" className="mt-10 space-y-10">
          <div className="space-y-0.5">
            <SubSectionHeading
              as="h2"
              className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              <Share2Icon className="size-6 stroke-[1.5]" />
              Social Links
            </SubSectionHeading>
            <Paragraph className="max-w-lg text-base lg:text-base">
              Enhance your professional network by connecting your social media
              profiles and personal website.
            </Paragraph>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitSocial)}
              className="space-y-5">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. shawqicauses" />
                    </FormControl>
                    <FormDescription>
                      Enter your GitHub username to showcase your portfolio and
                      collaborative contributions to the community.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. shawqicauses" />
                    </FormControl>
                    <FormDescription>
                      Provide your Instagram username to allow others to connect
                      with you and appreciate your creative work.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter/X</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. shawqicauses" />
                    </FormControl>
                    <FormDescription>
                      Share your Twitter/X username or profile URL to foster
                      wider engagement with your ideas and updates.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. shawqicauses" />
                    </FormControl>
                    <FormDescription>
                      Add your LinkedIn profile URL to highlight your
                      professional experience and connect with peers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. https://palestiniancauses.com"
                      />
                    </FormControl>
                    <FormDescription>
                      Include your personal or portfolio website to provide a
                      comprehensive overview of your expertise and interests.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={updateUser.isPending}>
                {updateUser.isPending ? "Saving..." : "Save Social Links"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="privacy" className="mt-10 space-y-10">
          <div className="space-y-0.5">
            <SubSectionHeading
              as="h2"
              className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              <ShieldHalfIcon className="size-6 stroke-[1.5]" />
              Privacy Settings
            </SubSectionHeading>
            <Paragraph className="max-w-lg text-base lg:text-base">
              Manage the visibility of your personal information and activity
              for your public profile with the controls below.
            </Paragraph>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitPrivacy)}
              className="space-y-5">
              <FormField
                control={form.control}
                name="showEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-5 border border-input p-5">
                    <div className="space-y-0.5">
                      <FormLabel>Show Email</FormLabel>
                      <FormDescription>
                        Allow others to view your email address on your public
                        profile to facilitate direct communication and
                        networking.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showActivity"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-5 border border-input p-5">
                    <div className="space-y-0.5">
                      <FormLabel>Show Activity</FormLabel>
                      <FormDescription>
                        Display an overview of your recent engagement and
                        participation to inspire interaction with other members.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showAchievements"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-5 border border-input p-5">
                    <div className="space-y-0.5">
                      <FormLabel>Show Achievements</FormLabel>
                      <FormDescription>
                        Highlight your milestones and recognitions, showcasing
                        your contributions to the community.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showOrders"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-5 border border-input p-5">
                    <div className="space-y-0.5">
                      <FormLabel>Show Orders</FormLabel>
                      <FormDescription>
                        Share your order activity as part of your profile,
                        promoting transparency and community trust.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={updateUser.isPending}>
                {updateUser.isPending ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </form>
          </Form>

          <div className="space-y-0.5 border-t border-input/50 pt-10">
            <SubSectionHeading
              as="h3"
              className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              <KeyIcon className="size-6 stroke-[1.5]" />
              Change Your Password
            </SubSectionHeading>
            <Paragraph className="max-w-5xl text-base lg:text-base">
              For the security of your account, we recommend updating your
              password regularly. Please ensure your new password is strong and
              unique to maintain the highest level of protection for your
              personal information.
            </Paragraph>
          </div>

          <Form {...passForm}>
            <form
              onSubmit={passForm.handleSubmit(async (data) => {
                updatePassword.mutate(
                  {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                  },
                  {
                    onSuccess: () => {
                      passForm.reset();
                    },
                  },
                );
              })}
              className="space-y-5">
              <FormField
                control={passForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={updatePassword.isPending}>
                {updatePassword.isPending ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="account" className="mt-10 space-y-10">
          <AccountDeletion user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
