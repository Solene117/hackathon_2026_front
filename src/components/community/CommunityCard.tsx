import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CommunityCardProps = {
  to: string;
  title: string;
  subtitle: string;
  image: string;
};

export default function CommunityCard({
  to,
  title,
  subtitle,
  image,
}: CommunityCardProps) {
  return (
    <Link
      to={to}
      className="block overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="h-44 w-full bg-neutral-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center gap-4 p-5">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-neutral-600">
            {subtitle}
          </p>
        </div>

        <ChevronRight
          size={22}
          className="text-[#27509B]"
        />
      </div>
    </Link>
  );
}