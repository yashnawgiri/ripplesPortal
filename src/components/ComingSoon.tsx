import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function ComingSoon() {
  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-transparent">
      <Card className="w-full max-w-lg bg-primary text-white">
        <CardHeader className="flex flex-col gap-2 text-center p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-lg text-default-600">
            We&apos;re working hard to bring you something amazing
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {/* Email Subscription */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">
              Get notified when we launch
            </h2>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                className="flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                aria-label="Get notified when we launch"
                className="font-semibold"
                color="secondary"
                size="lg"
              >
                Notify Me
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
