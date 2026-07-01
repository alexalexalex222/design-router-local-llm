from pathlib import Path

from design_router_mcp.cli import main
from design_router_mcp.service import resolve_design_context
from design_router_mcp.validation import validate_repository


ROOT = Path(__file__).resolve().parents[1]


def test_public_snapshot_validates():
    result = validate_repository(ROOT)
    assert result["all_pass"], result


def test_saas_routes_to_signalstack():
    packet = resolve_design_context(
        ROOT,
        surface="website.local_service",
        task="Build a B2B SaaS analytics dashboard landing page",
        stack="html_css",
        token_mode="compact",
        code_profile="code_first",
    )

    assert "signalstack_saas_analytics_ink_v1" in packet.markdown


def test_cli_export_writes_packet(tmp_path):
    exit_code = main(
        [
            "--repo-root",
            str(ROOT),
            "export",
            "--surface",
            "website.local_service",
            "--task",
            "Build a rural water service homepage",
            "--output-dir",
            str(tmp_path),
            "--token-mode",
            "micro",
            "--stack",
            "html_css",
        ]
    )

    assert exit_code == 0
    assert (tmp_path / "PACKET.md").is_file()
    assert (tmp_path / "SOURCES.json").is_file()

