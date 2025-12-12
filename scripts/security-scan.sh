#!/bin/bash
# ============================================================================
# Docker Security Scanner
# ============================================================================
# Comprehensive security check for Docker images and containers
# Run before deploying to production
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

IMAGE_NAME="${1:-squarecampus-marketing:latest}"
CONTAINER_NAME="squarecampus-marketing"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Docker Security Scanner for SquareCampus              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# 1. Image Existence Check
# ============================================================================
echo -e "${YELLOW}[1/10] Checking if image exists...${NC}"
if docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Image found: $IMAGE_NAME${NC}"
else
    echo -e "${RED}✗ Image not found: $IMAGE_NAME${NC}"
    exit 1
fi
echo ""

# ============================================================================
# 2. Image Size Check
# ============================================================================
echo -e "${YELLOW}[2/10] Checking image size...${NC}"
IMAGE_SIZE=$(docker image inspect "$IMAGE_NAME" --format='{{.Size}}' | awk '{print $1/1024/1024}')
if (( $(echo "$IMAGE_SIZE < 500" | bc -l) )); then
    echo -e "${GREEN}✓ Image size is acceptable: ${IMAGE_SIZE} MB${NC}"
else
    echo -e "${RED}✗ Image size is too large: ${IMAGE_SIZE} MB (should be < 500 MB)${NC}"
fi
echo ""

# ============================================================================
# 3. User Check (Non-Root)
# ============================================================================
echo -e "${YELLOW}[3/10] Checking if image runs as non-root...${NC}"
USER_ID=$(docker image inspect "$IMAGE_NAME" --format='{{.Config.User}}')
if [ "$USER_ID" = "nextjs" ] || [ "$USER_ID" = "1001" ] || [ "$USER_ID" = "1001:1001" ]; then
    echo -e "${GREEN}✓ Image runs as non-root user: $USER_ID${NC}"
else
    echo -e "${RED}✗ Image runs as root or unknown user: ${USER_ID:-root}${NC}"
fi
echo ""

# ============================================================================
# 4. Secrets Check (No .env in layers)
# ============================================================================
echo -e "${YELLOW}[4/10] Checking for secrets in image layers...${NC}"
if docker history "$IMAGE_NAME" --no-trunc | grep -iE '\.env|password|secret|api[_-]?key|token' > /dev/null 2>&1; then
    echo -e "${RED}✗ Potential secrets found in image layers!${NC}"
    docker history "$IMAGE_NAME" --no-trunc | grep -iE '\.env|password|secret|api[_-]?key|token' || true
else
    echo -e "${GREEN}✓ No obvious secrets in image layers${NC}"
fi
echo ""

# ============================================================================
# 5. Health Check Configuration
# ============================================================================
echo -e "${YELLOW}[5/10] Checking health check configuration...${NC}"
HEALTHCHECK=$(docker image inspect "$IMAGE_NAME" --format='{{.Config.Healthcheck}}')
if [ "$HEALTHCHECK" != "<nil>" ] && [ -n "$HEALTHCHECK" ]; then
    echo -e "${GREEN}✓ Health check configured${NC}"
else
    echo -e "${RED}✗ No health check configured${NC}"
fi
echo ""

# ============================================================================
# 6. Vulnerability Scan (Docker Scout if available)
# ============================================================================
echo -e "${YELLOW}[6/10] Running vulnerability scan...${NC}"
if command -v docker-scout > /dev/null 2>&1 || docker scout version > /dev/null 2>&1; then
    echo "Running Docker Scout scan..."
    docker scout cve "$IMAGE_NAME" || echo -e "${YELLOW}⚠ Scout scan completed with findings${NC}"
elif command -v trivy > /dev/null 2>&1; then
    echo "Running Trivy scan..."
    trivy image --severity HIGH,CRITICAL "$IMAGE_NAME" || echo -e "${YELLOW}⚠ Trivy scan completed with findings${NC}"
else
    echo -e "${YELLOW}⚠ No scanner available (install docker-scout or trivy)${NC}"
fi
echo ""

# ============================================================================
# 7. Base Image Check
# ============================================================================
echo -e "${YELLOW}[7/10] Checking base image...${NC}"
BASE_IMAGE=$(docker image inspect "$IMAGE_NAME" --format='{{range .Config.Env}}{{println .}}{{end}}' | grep -i 'base' || echo "unknown")
echo "Base image info: $BASE_IMAGE"
if docker history "$IMAGE_NAME" | grep -q "alpine"; then
    echo -e "${GREEN}✓ Using minimal Alpine base${NC}"
else
    echo -e "${YELLOW}⚠ Not using Alpine base (consider switching for smaller attack surface)${NC}"
fi
echo ""

# ============================================================================
# 8. Exposed Ports Check
# ============================================================================
echo -e "${YELLOW}[8/10] Checking exposed ports...${NC}"
EXPOSED_PORTS=$(docker image inspect "$IMAGE_NAME" --format='{{range $port, $_ := .Config.ExposedPorts}}{{$port}} {{end}}')
if [ -n "$EXPOSED_PORTS" ]; then
    echo -e "${GREEN}✓ Exposed ports: $EXPOSED_PORTS${NC}"
    PORT_COUNT=$(echo "$EXPOSED_PORTS" | wc -w)
    if [ "$PORT_COUNT" -gt 2 ]; then
        echo -e "${YELLOW}⚠ Multiple ports exposed ($PORT_COUNT) - minimize attack surface${NC}"
    fi
else
    echo -e "${YELLOW}⚠ No ports exposed${NC}"
fi
echo ""

# ============================================================================
# 9. Running Container Security (if running)
# ============================================================================
echo -e "${YELLOW}[9/10] Checking running container security...${NC}"
if docker ps --filter "name=$CONTAINER_NAME" --format '{{.Names}}' | grep -q "$CONTAINER_NAME"; then
    echo "Container is running. Checking security options..."

    # Check read-only root filesystem
    READ_ONLY=$(docker inspect "$CONTAINER_NAME" --format='{{.HostConfig.ReadonlyRootfs}}')
    if [ "$READ_ONLY" = "true" ]; then
        echo -e "${GREEN}✓ Read-only root filesystem enabled${NC}"
    else
        echo -e "${RED}✗ Read-only root filesystem NOT enabled${NC}"
    fi

    # Check capabilities
    CAPS=$(docker inspect "$CONTAINER_NAME" --format='{{.HostConfig.CapDrop}}')
    if [[ "$CAPS" == *"ALL"* ]]; then
        echo -e "${GREEN}✓ All capabilities dropped${NC}"
    else
        echo -e "${RED}✗ Capabilities not properly restricted${NC}"
    fi

    # Check security options
    SECURITY_OPT=$(docker inspect "$CONTAINER_NAME" --format='{{.HostConfig.SecurityOpt}}')
    if [[ "$SECURITY_OPT" == *"no-new-privileges"* ]]; then
        echo -e "${GREEN}✓ no-new-privileges enabled${NC}"
    else
        echo -e "${RED}✗ no-new-privileges NOT enabled${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Container not running. Start container to check runtime security.${NC}"
fi
echo ""

# ============================================================================
# 10. Layer Count Check
# ============================================================================
echo -e "${YELLOW}[10/10] Checking image layer count...${NC}"
LAYER_COUNT=$(docker history "$IMAGE_NAME" --quiet | wc -l)
echo "Total layers: $LAYER_COUNT"
if [ "$LAYER_COUNT" -lt 20 ]; then
    echo -e "${GREEN}✓ Layer count is acceptable${NC}"
else
    echo -e "${YELLOW}⚠ High layer count ($LAYER_COUNT) - consider optimizing Dockerfile${NC}"
fi
echo ""

# ============================================================================
# Summary
# ============================================================================
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                     Security Scan Complete                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Review any warnings or errors above"
echo "2. Run: docker-compose -f docker-compose.secure.yml up -d"
echo "3. Test health endpoint: curl http://localhost:3000/api/health"
echo "4. Monitor logs: docker-compose -f docker-compose.secure.yml logs -f"
echo ""
echo -e "${YELLOW}For detailed security guide, see: DOCKER_SECURITY.md${NC}"
